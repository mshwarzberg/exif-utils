import { ExifUtil } from '..';
import { ErrorPlaceholder } from '../core/interfaces';
import { DataType, Err } from '../core/types';
import ArchivePropertyBuilder from './file-types/archive';
import DocumentPropertyBuilder from './file-types/document';
import FilePropertyBuilder from './file-types/file';
import ImagePropertyBuilder from './file-types/image';
import VideoPropertyBuilder from './file-types/video';

/**
 * The base class for all reading of metadata. If {@link readSync} or {@link @readAsync}
 * is called without setting any properties, all properties will be read.
 * To read specific properties use {@link filePropertyBuilder} field to select the appropriate properties.
 */
export default abstract class Reader implements ErrorPlaceholder {
	readonly exifUtil: ExifUtil;
	readonly dataType: DataType;
	private filePropertyBuilder = new FilePropertyBuilder();

	/**
     * @param dataType - The format in which the data will be returned
     */
	constructor(exifUtil: ExifUtil, dataType: DataType) {
		this.exifUtil = exifUtil;
		this.dataType = dataType;
	}

	/**
	 * @param properties a list of properties (exclude or include).
	 * @param isInclude whether the list of properties are properties to include or exclude.
	 * @returns all the properties joined something like "'-propertyA -propertyB -propertyC'"
	 * or "'--propertyA --propertyB --propertyC'" depending on whether the properties are include
	 * or exclude.
	 */
	private static propertiesToString(properties: Array<string>, isInclude: boolean): string {
		const prefix = isInclude ? '-' : '--';
		return properties.map((property) => `${prefix}${property} `)
			.join('');
	}

	/**
     * Reads metadata asynchronously.
     * @alert Implementations of this function must be asynchronous.
     * - This function asynchronously reads metadata from a file or folder's content.
     * @returns A Promise that resolves to an object containing the extracted metadata or a string.
     */
	abstract readAsync(): Promise<Array<Record<string, unknown>> | string>;

	/**
     * Reads metadata synchronously.
     * @alert Implementations of this function must be synchronous.
     * - This function synchronously reads metadata from a file or folder's content.
     * @returns An array of objects containing the extracted metadata or a string.
     */
	abstract readSync(): Array<Record<string, unknown>> | string;

	/**
     * Subclasses must implement a way to get a message based on the datatype.
     * @param error an error caused by read failure (most commonly reading invalid file paths)
     */
	abstract getErrorPlaceholder(error: Err): string | Array<Record<string, unknown>>;

	/**
     * Constructs the command string.
     * - Joins all file/folder paths with '" "' between each path in the array of {@link ExifUtil.paths}.
     * - Inserts the {@link dataType} which is what controls exiftool's output format.
     * - -q is used to suppress informational prints by exiftool
     * @returns A complete command used to retrieve metadata.
     */
	protected getCMD(): string {
		const concatPaths = `${this.exifUtil.getPaths().join('" "')}`;
		const propertiesInclude: string = Reader.propertiesToString(
			this.filePropertyBuilder.getPropertiesInclude(),
			true,
		);
		const propertiesExclude: string = Reader.propertiesToString(
			this.filePropertyBuilder.getPropertiesExclude(),
			false,
		);
		return `"${ExifUtil.exifToolPath}" ${this.dataType} -q ${propertiesInclude} ${propertiesExclude} "${concatPaths}"`;
	}

	/**
     * After reading from a file, reset the builder to its default value (clearing the selected/unselected properties).
     */
	public resetPropertyBuilder(): void {
		this.filePropertyBuilder = new FilePropertyBuilder();
	}

	/**
     * Sets the {@link filePropertyBuilder} to type archive then
     * @returns the builder itself.
     */
	public archivePropertyBuilder(): ArchivePropertyBuilder {
		return (this.filePropertyBuilder = new ArchivePropertyBuilder());
	}

	/**
     * Sets the {@link filePropertyBuilder} to type document then
     * @returns the builder itself.
     */
	public documentPropertyBuilder(): DocumentPropertyBuilder {
		return (this.filePropertyBuilder = new DocumentPropertyBuilder());
	}

	/**
     * Sets the {@link filePropertyBuilder} to type image then
     * @returns the builder itself.
     */
	public imagePropertyBuilder(): ImagePropertyBuilder {
		return (this.filePropertyBuilder = new ImagePropertyBuilder());
	}

	/**
     * Sets the {@link filePropertyBuilder} to type video then
     * @returns the builder itself.
     */
	public videoPropertyBuilder(): VideoPropertyBuilder {
		return (this.filePropertyBuilder = new VideoPropertyBuilder());
	}

	/**
     * @returns the current instance of {@link FilePropertyBuilder}
     */
	public getFilePropertyBuilder(): FilePropertyBuilder {
		return this.filePropertyBuilder;
	}
}
