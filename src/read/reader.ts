import { ExifUtil } from "..";
import { DataType } from "../types";
import FilePropertyBuilder from "./file-types/file";

/**
 * All the functions that begin with "with" are for properties that are shared by all files 
 * If a property is both selected and unselected it will be included in the result.
 */
export default abstract class Reader {

    readonly exifUtil: ExifUtil;
    readonly dataType: DataType;
    filePropertyBuilder = new FilePropertyBuilder();

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
        const propertiesInclude = this.filePropertyBuilder.getPropertiesInclude();
        const propertiesExclude = this.filePropertyBuilder.getPropertiesExclude();
        let includedProperties = propertiesInclude.map(property => `-${property} `).join("");
        let excludedProperties = propertiesExclude.map(property => `--${property} `).join("");
        return `"${ExifUtil.exifToolPath}" ${this.dataType} -q ${includedProperties} ${excludedProperties} "${concatPaths}"`;
    }

    public resetPropertyBuilder(): void {
        this.filePropertyBuilder = new FilePropertyBuilder();
    }
}
