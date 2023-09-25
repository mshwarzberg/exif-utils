import { ExifUtil } from "..";
import { DataType } from "../types";

/**
 * All the functions that begin with "with" are for properties that are shared by all files 
 * If a property is both selected and unselected it will be included in the result.
 */
export default abstract class Reader {

    readonly exifUtil: ExifUtil;
    readonly dataType: DataType;
    private readonly propertiesInclude: string[] = [];
    private readonly propertiesExclude: string[] = [];

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
    * Constructs the command string.
    * - Joins all file/folder paths with '" "' between each path in the array of {@link ExifUtil.paths}.
    * - Inserts the {@link dataType} which is what controls exiftool's output format.
    * - -q is used to suppress informational prints by exiftool
    * @returns A complete command used to retrieve metadata.
    */
    protected getCMD(): string {
        const concatPaths = `${this.exifUtil.getPaths().join('" "')}`;
        let includedProperties = this.propertiesInclude.map(property => `-${property} `).join("");
        let excludedProperties = this.propertiesExclude.map(property => `--${property} `).join("");
        return `"${ExifUtil.exifToolPath}" ${this.dataType} -q ${includedProperties} ${excludedProperties} "${concatPaths}"`;
    }

    private includeProperty(property: string): void {
        if (!this.propertiesInclude.includes(property)) {
            this.propertiesInclude.push(property);
        }
    }

    private excludeProperty(property: string): void {
        if (!this.propertiesExclude.includes(property)) {
            this.propertiesExclude.push(property);
        }
    }

    public clearExcludedProperties(): void {
        this.propertiesExclude.length = 0;
    }

    public clearIncludedProperties(): void {
        this.propertiesInclude.length = 0;
    }

    /**
    * - The relative file path. e.g "/path/to/your/image.jpg"
    * - The absolute file path. e.g "C:/Users/[username]/Pictures/image.jpg"
    * @returns this to chain property selection
    */
    public withFilePath(): Reader {
        this.includeProperty("SourceFile");
        return this;
    }

    /**
    * The file's name itself. e.g "image.jpg"
    * @returns this to chain property selection
    */
    public withFileName(): Reader {
        this.includeProperty("FileName");
        return this;
    }

    /**
    * - The relative parent directory path. e.g "/path/to/your/image/"
    * - The absolute parent directory path. e.g "C:/Users/[username]/Pictures/"
    * @returns this to chain property selection
    */
    public withDirectory(): Reader {
        this.includeProperty("Directory");
        return this;
    }

    /**
    * A string that represents the file size. e.g "100 kB", "55 bytes", "5 MB"
    * @returns this to chain property selection
    */
    public withFileSize(): Reader {
        this.includeProperty("FileSize");
        return this;
    }

    /**
    * A date of when the file was last modified. e.g "2023:09:24 20:40:29-04:00"
    * @returns this to chain property selection
    */
    public withLastModified(): Reader {
        this.includeProperty("FileModifyDate")
        return this;
    }

    /**
    * A date of when the file was last accessed. e.g "2023:09:24 20:40:29-04:00"
    * @returns this to chain property selection
    */
    public withLastAccessed(): Reader {
        this.includeProperty("FileAccessDate")
        return this;
    }

    /**
    * A date of when the file was created. e.g "2023:09:24 20:40:29-04:00"
    * @returns this to chain property selection
    */
    public withCreatedDate(): Reader {
        this.includeProperty("FileCreatedDate");
        return this;
    }

    /**
     * A single word representing the file type. e.g "JPEG", "PDF", "M4V"
     * @returns this to chain property selection
     */
    public withFileType(): Reader {
        this.includeProperty("FileType");
        return this;
    }

    /**
    * Essentially the same as {@link withFileType}'s value. Just lower case
    * @returns this to chain property selection
    */
    public withFileExtension(): Reader {
        this.includeProperty("FileTypeExtension");
        return this;
    }

    /**
    * Also very similar to {@link withFileType}. 
    * e.g "image/jpeg", "video/x-m4v", "application/pdf", "application/json"
    * @returns this to chain property selection
    */
    public withMIMEType(): Reader {
        this.includeProperty("MIMEType")
        return this;
    }

    /**
    * The permissions for the file. e.g "-rw-rw-rw-"
    * @returns this to chain property selection
    */
    public withFilePermissions(): Reader {
        this.includeProperty("FilePermissions")
        return this;
    }

    /**
    * - The relative file path. e.g "/path/to/your/image.jpg"
    * - The absolute file path. e.g "C:/Users/[username]/Pictures/image.jpg"
    * @returns this to chain property selection
    */
    public withoutFilePath(): Reader {
        this.excludeProperty("SourceFile");
        return this;
    }

    /**
    * The file's name itself. e.g "image.jpg"
    * @returns this to chain property selection
    */
    public withoutFileName(): Reader {
        this.excludeProperty("FileName");
        return this;
    }

    /**
    * - The relative parent directory path. e.g "/path/to/your/image/"
    * - The absolute parent directory path. e.g "C:/Users/[username]/Pictures/"
    * @returns this to chain property selection
    */
    public withoutDirectory(): Reader {
        this.excludeProperty("Directory");
        return this;
    }

    /**
    * A string that represents the file size. e.g "100 kB", "55 bytes", "5 MB"
    * @returns this to chain property selection
    */
    public withoutFileSize(): Reader {
        this.excludeProperty("FileSize");
        return this;
    }

    /**
    * A date of when the file was last modified. e.g "2023:09:24 20:40:29-04:00"
    * @returns this to chain property selection
    */
    public withoutLastModified(): Reader {
        this.excludeProperty("FileModifyDate")
        return this;
    }

    /**
    * A date of when the file was last accessed. e.g "2023:09:24 20:40:29-04:00"
    * @returns this to chain property selection
    */
    public withoutLastAccessed(): Reader {
        this.excludeProperty("FileAccessDate")
        return this;
    }

    /**
    * A date of when the file was created. e.g "2023:09:24 20:40:29-04:00"
    * @returns this to chain property selection
    */
    public withoutCreatedDate(): Reader {
        this.excludeProperty("FileCreatedDate");
        return this;
    }

    /**
    * A single word representing the file type. e.g "JPEG", "PDF", "M4V"
    * @returns this to chain property selection
    */
    public withoutFileType(): Reader {
        this.excludeProperty("FileType");
        return this;
    }

    /**
    * Essentially the same as {@link withoutFileType}'s value. Just lower case
    * @returns this to chain property selection
    */
    public withoutFileExtension(): Reader {
        this.excludeProperty("FileTypeExtension");
        return this;
    }

    /**
    * Also very similar to {@link withoutFileType}. 
    * e.g "image/jpeg", "video/x-m4v", "application/pdf", "application/json"
    * @returns this to chain property selection
    */
    public withoutMIMEType(): Reader {
        this.excludeProperty("MIMEType")
        return this;
    }


    /**
    * The permissions for the file. e.g "-rw-rw-rw-"
    * @returns this to chain property selection
    */
    public withoutFilePermissions(): Reader {
        this.excludeProperty("FilePermissions")
        return this;
    }

    /**
     * @param properties any number of property names that 
     * don't have their own function to exclude from scan
     * @returns this to chain property selection
     */
    public withoutProperties(...properties: string[]): Reader {
        for (const property of properties) {
            this.excludeProperty(property);
        }
        return this;
    }

    /**
     * @param properties any number of property names that 
     * don't have their own function to include in scan
     * @returns this to chain property selection
     */
    public withProperties(...properties: string[]): Reader {
        for (const property of properties) {
            this.includeProperty(property);
        }
        return this;
    }
}
