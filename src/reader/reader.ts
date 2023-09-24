import ExifUtil from "..";
import { DataType } from "../types";

/**
 * The `Reader` class serves as the base class for all metadata reading classes.
 * Subclasses inherit common functionality for reading metadata from files and folders.
 */
export default abstract class Reader {
    exifUtil: ExifUtil;
    dataType: DataType;

    /**
     * Creates a new instance of the `Reader` class.
     * @param exifUtil - An instance of the {@link ExifUtil} class, used for handling file paths.
     * @param dataType - The type of metadata to be extracted.
     */
    constructor(exifUtil: ExifUtil, dataType: DataType) {
        this.exifUtil = exifUtil;
        this.dataType = dataType;
    }

    /**
     * Reads the metadata asynchronously.
     * @alert Implementations of this method must be asynchronous.
     * - This method asynchronously reads metadata from a file or folder's content.
     * @returns A Promise that resolves to an object containing the extracted metadata or a string.
     */
    abstract readAsync(): Promise<Record<string, any> | string>;

    /**
     * Reads the metadata synchronously.
     * @alert Implementations of this method must be synchronous.
     * - This method synchronously reads metadata from a file or folder's content.
     * @returns An array of objects containing the extracted metadata or a string.
     */
    abstract readSync(): Array<Record<string, any>> | string;

    /**
     * Constructs the command string.
     * - Joins all file or folder paths with '" "' between each path in the array of {@link ExifUtil.paths}.
     * - Inserts the {@link dataType} with a dash in front of it.
     * @returns The command used to retrieve metadata.
     */
    protected getCMD(): string {
        const concatPaths = `${this.exifUtil.getPaths().join('" "')}`;
        return `"${ExifUtil.exifUtilPath}" -${this.dataType} "${concatPaths}"`;
    }
}
