import CSVReader from './metadata-read/data-types/csv-reader';
import DefaultReader from './metadata-read/data-types/default-reader';
import HTMLReader from './metadata-read/data-types/html-reader';
import JSONReader from './metadata-read/data-types/json-reader';
import path from 'path';
import os from 'os';
import util from 'util';
import child_process, { execSync } from 'child_process';
import XMLReader from  './metadata-read/data-types/xml-reader';
import Writer from './write/writer';
import InfoJSON from './general/data-types/json-info';
import { DataType } from './core/types';
import InfoReader from './general/info-reader';

export const execAsync = util.promisify(child_process.exec);
export { execSync };

/**
 * A (hopefully) temporary function that validates whether the current OS is windows
 * (windows is the only OS currently supported)
 */
function validateOS() {
	const supportedOS = ['win32'];

	if (!supportedOS.includes(os.platform())) {
		throw new Error('Your OS isn\'t supported');
	}
}

validateOS();

/**
 * This is intended to only be called once.
 * There is functionality to update the necessary properties to scan different locations,
 * or to change the output format, etc.
 */
export class ExifUtil {
	/**
     * If any one of the paths are invalid, extraction of metadata will fail.
     */
	private paths: Array<string>;

	/**
     * The absolute path representation of exiftool location.
     */
	private static exifToolPath: string = path.join(
		__dirname,
		'../resources/exiftool.exe',
	);

	/**
	 * @throws an error if no paths are provided
     * @note paths can be overridden by using {@link setPaths}
     * @param paths any number of files or folders to be read
     */
	constructor(...paths: Array<string>) {
		if (paths.length === 0) {
			throw new Error('At least one path must be provided.');
		}
		this.paths = paths;
	}

	/**
     * @returns a new instance of {@link JSONReader}
     */
	public jsonReader(): JSONReader {
		return new JSONReader(this);
	}

	/**
     * @returns a new instance of {@link CSVReader}
     */
	public csvReader(): CSVReader {
		return new CSVReader(this);
	}

	/**
     * @returns a new instance of {@link HTMLReader}
     */
	public htmlReader(): HTMLReader {
		return new HTMLReader(this);
	}

	/**
     * @returns a new instance of {@link DefaultReader}
     */
	public defaultReader(): DefaultReader {
		return new DefaultReader(this);
	}

	/**
     * @returns a new instance of {@link XMLReader}
     */
	public xmlReader(): XMLReader {
		return new XMLReader(this);
	}

	public jsonInfo(): InfoJSON {
		return new InfoJSON(this);
	}

	public writer(): Writer {
		return new Writer(this);
	}

	/**
     * This will update the {@link paths} of the instance of {@link ExifUtil}
     * This is more preferable than creating a new instance entirely in the case of updating the paths.
     * @throws an error if no paths are provided
	 * @param paths a list of paths that are to be scanned.
     */
	public setPaths(...paths: Array<string>): void {
		if (paths.length === 0) {
			throw new Error('At least one path must be provided.');
		}
		this.paths = paths;
	}

	/**
     * @returns {Array<string>} The array of files/folders {@link paths} to extract metadata from.
     */
	public getPaths(): Array<string> {
		return this.paths;
	}

	public static getExiftoolPath(): string {
		return this.exifToolPath;
	}

	public getVersionSync(): string {
		return new VersionReader(this, DataType.DEFAULT).getVersionSync();
	}

	public async getVersionAsync(): Promise<string> {
		return new VersionReader(this, DataType.DEFAULT).getVersionAsync();
	}

}

/**
 * designed to only get version from the main {@link ExifUtil} class
 */
class VersionReader extends InfoReader {

	public getVersionSync(): string {
		this.command = `${ExifUtil.getExiftoolPath()} -ver`;
		return this.executeSync();
	}

	public async getVersionAsync(): Promise<string> {
		this.command = `${ExifUtil.getExiftoolPath()} -ver`;
		return this.executeAsync();
	}
}
