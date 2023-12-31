import { ExifUtil } from "..";
import { DataType } from "../types";
import ArchivePropertyBuilder from "./file-types/archive";
import DocumentPropertyBuilder from "./file-types/document";
import FilePropertyBuilder from "./file-types/file";
import ImagePropertyBuilder from "./file-types/image";
import VideoPropertyBuilder from "./file-types/video";

/**
 * The base class for all reading of metadata. If {@link readSync} or {@link @readAsync} 
 * is called without setting any properties, all properties will be read.
 * To read specific properties use {@link filePropertyBuilder} field to select the appropriate properties.
 */
export default abstract class Reader {

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
    * Reads metadata asynchronously.
    * @alert Implementations of this function must be asynchronous.
    * - This function asynchronously reads metadata from a file or folder's content.
    * @returns A Promise that resolves to an object containing the extracted metadata or a string.
    */
    abstract readAsync(): Promise<Record<string, any> | string>;

    /**
    * Reads metadata synchronously.
    * @alert Implementations of this function must be synchronous.
    * - This function synchronously reads metadata from a file or folder's content.
    * @returns An array of objects containing the extracted metadata or a string.
    */
    abstract readSync(): Record<string, any>[] | string;

    /**
     * Subclasses must implement a way to get a message based on the datatype.
     * @param error an error caused by read failure (most commonly reading invalid file paths)
     */
    abstract getErrorPlaceholder(error: any): Record<string, any>[] | string;

    /**
    * Constructs the command string.
    * - Joins all file/folder paths with '" "' between each path in the array of {@link ExifUtil.paths}.
    * - Inserts the {@link dataType} which is what controls exiftool's output format.
    * - -q is used to suppress informational prints by exiftool
    * @returns A complete command used to retrieve metadata.
    */
    protected getCMD(): string {
        const concatPaths = `${this.exifUtil.getPaths().join('" "')}`;
        let propertiesInclude: string[], propertiesExclude: string[];
        if (this.filePropertyBuilder === null) {
            propertiesExclude = []
            propertiesInclude = []
        } else {
            propertiesInclude = this.filePropertyBuilder.getPropertiesInclude();
            propertiesExclude = this.filePropertyBuilder.getPropertiesExclude();
        }
        const includedProperties = propertiesInclude.map(property => `-${property} `).join("");
        const excludedProperties = propertiesExclude.map(property => `--${property} `).join("");
        return `"${ExifUtil.exifToolPath}" ${this.dataType} -q ${includedProperties} ${excludedProperties} "${concatPaths}"`;
    }

    /**
     * After reading from a file, reset the builder to its default value (clearing the selected/unselected properties).
     */
    public resetPropertyBuilder(): void {
        this.filePropertyBuilder = new FilePropertyBuilder();
    }

    public archivePropertyBuilder(): ArchivePropertyBuilder {
        return this.filePropertyBuilder = new ArchivePropertyBuilder();
    }

    public documentPropertyBuilder(): DocumentPropertyBuilder {
        return this.filePropertyBuilder = new DocumentPropertyBuilder();
    }

    public imagePropertyBuilder(): ImagePropertyBuilder {
        return this.filePropertyBuilder = new ImagePropertyBuilder();
    }

    public videoPropertyBuilder(): VideoPropertyBuilder {
        return this.filePropertyBuilder = new VideoPropertyBuilder();
    }
}
