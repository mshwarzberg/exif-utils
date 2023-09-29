/**
 * The class used to set properties that are to be included or excluded.
 * If the file type of the file being read is known use the appropriate subclass.
 * Otherwise, use {@link withProperties} to select any property by name
 */
export default class FilePropertyBuilder {

    private readonly propertiesInclude: string[] = [];
    private readonly propertiesExclude: string[] = [];

    public getPropertiesInclude() {
        return this.propertiesInclude;
    }
    
    public getPropertiesExclude() {
        return this.propertiesExclude;
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
    public withFilePath(): FilePropertyBuilder {
        this.includeProperty("SourceFile");
        return this;
    }

    /**
    * The file's name itself. e.g "image.jpg"
    * @returns this to chain property selection
    */
    public withFileName(): FilePropertyBuilder {
        this.includeProperty("FileName");
        return this;
    }

    /**
    * - The relative parent directory path. e.g "/path/to/your/image/"
    * - The absolute parent directory path. e.g "C:/Users/[username]/Pictures/"
    * @returns this to chain property selection
    */
    public withDirectory(): FilePropertyBuilder {
        this.includeProperty("Directory");
        return this;
    }

    /**
    * A string that represents the file size. e.g "100 kB", "55 bytes", "5 MB"
    * @returns this to chain property selection
    */
    public withFileSize(): FilePropertyBuilder {
        this.includeProperty("FileSize");
        return this;
    }

    /**
    * A date of when the file was last modified. e.g "2023:09:24 20:40:29-04:00"
    * @returns this to chain property selection
    */
    public withLastModified(): FilePropertyBuilder {
        this.includeProperty("FileModifyDate")
        return this;
    }

    /**
    * A date of when the file was last accessed. e.g "2023:09:24 20:40:29-04:00"
    * @returns this to chain property selection
    */
    public withLastAccessed(): FilePropertyBuilder {
        this.includeProperty("FileAccessDate")
        return this;
    }

    /**
    * A date of when the file was created. e.g "2023:09:24 20:40:29-04:00"
    * @returns this to chain property selection
    */
    public withCreatedDate(): FilePropertyBuilder {
        this.includeProperty("FileCreatedDate");
        return this;
    }

    /**
     * A single word representing the file type. e.g "JPEG", "PDF", "M4V"
     * @returns this to chain property selection
     */
    public withFileType(): FilePropertyBuilder {
        this.includeProperty("FileType");
        return this;
    }

    /**
    * Essentially the same as {@link withFileType}'s value. Just lower case
    * @returns this to chain property selection
    */
    public withFileExtension(): FilePropertyBuilder {
        this.includeProperty("FileTypeExtension");
        return this;
    }

    /**
    * Also very similar to {@link withFileType}. 
    * e.g "image/jpeg", "video/x-m4v", "application/pdf", "application/json"
    * @returns this to chain property selection
    */
    public withMIMEType(): FilePropertyBuilder {
        this.includeProperty("MIMEType")
        return this;
    }

    /**
    * The permissions for the file. e.g "-rw-rw-rw-"
    * @returns this to chain property selection
    */
    public withFilePermissions(): FilePropertyBuilder {
        this.includeProperty("FilePermissions")
        return this;
    }

    /**
    * - The relative file path. e.g "/path/to/your/image.jpg"
    * - The absolute file path. e.g "C:/Users/[username]/Pictures/image.jpg"
    * @returns this to chain property selection
    */
    public withoutFilePath(): FilePropertyBuilder {
        this.excludeProperty("SourceFile");
        return this;
    }

    /**
    * The file's name itself. e.g "image.jpg"
    * @returns this to chain property selection
    */
    public withoutFileName(): FilePropertyBuilder {
        this.excludeProperty("FileName");
        return this;
    }

    /**
    * - The relative parent directory path. e.g "/path/to/your/image/"
    * - The absolute parent directory path. e.g "C:/Users/[username]/Pictures/"
    * @returns this to chain property selection
    */
    public withoutDirectory(): FilePropertyBuilder {
        this.excludeProperty("Directory");
        return this;
    }

    /**
    * A string that represents the file size. e.g "100 kB", "55 bytes", "5 MB"
    * @returns this to chain property selection
    */
    public withoutFileSize(): FilePropertyBuilder {
        this.excludeProperty("FileSize");
        return this;
    }

    /**
    * A date of when the file was last modified. e.g "2023:09:24 20:40:29-04:00"
    * @returns this to chain property selection
    */
    public withoutLastModified(): FilePropertyBuilder {
        this.excludeProperty("FileModifyDate")
        return this;
    }

    /**
    * A date of when the file was last accessed. e.g "2023:09:24 20:40:29-04:00"
    * @returns this to chain property selection
    */
    public withoutLastAccessed(): FilePropertyBuilder {
        this.excludeProperty("FileAccessDate")
        return this;
    }

    /**
    * A date of when the file was created. e.g "2023:09:24 20:40:29-04:00"
    * @returns this to chain property selection
    */
    public withoutCreatedDate(): FilePropertyBuilder {
        this.excludeProperty("FileCreatedDate");
        return this;
    }

    /**
    * A single word representing the file type. e.g "JPEG", "PDF", "M4V"
    * @returns this to chain property selection
    */
    public withoutFileType(): FilePropertyBuilder {
        this.excludeProperty("FileType");
        return this;
    }

    /**
    * Essentially the same as {@link withoutFileType}'s value. Just lower case
    * @returns this to chain property selection
    */
    public withoutFileExtension(): FilePropertyBuilder {
        this.excludeProperty("FileTypeExtension");
        return this;
    }

    /**
    * Also very similar to {@link withoutFileType}. 
    * e.g "image/jpeg", "video/x-m4v", "application/pdf", "application/json"
    * @returns this to chain property selection
    */
    public withoutMIMEType(): FilePropertyBuilder {
        this.excludeProperty("MIMEType")
        return this;
    }


    /**
    * The permissions for the file. e.g "-rw-rw-rw-"
    * @returns this to chain property selection
    */
    public withoutFilePermissions(): FilePropertyBuilder {
        this.excludeProperty("FilePermissions")
        return this;
    }

    /**
     * @param properties any number of property names that 
     * don't have their own function to exclude from scan
     * @returns this to chain property selection
     */
    public withoutProperties(...properties: string[]): FilePropertyBuilder {
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
    public withProperties(...properties: string[]): FilePropertyBuilder {
        for (const property of properties) {
            this.includeProperty(property);
        }
        return this;
    }

}