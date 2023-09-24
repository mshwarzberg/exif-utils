import { ExifUtil } from "../..";
import { DataType } from "../../types";
import CSVReader from "../csv";
import HTMLReader from "../html";
import JSONReader from "../json";
import Reader from "../reader";

/**
 * If you want to read all properties use {@link Reader} or its subclasses in the property folder.
 */
export default class PropertyReader {
    exifUtil: ExifUtil;
    dataType: DataType;
    readonly propertiesToRead: string[] = ["SourceFile"]; // Default to just the SourceFile property to prevent all properties from being selected if nothing has been selected.

    constructor(dataType: DataType, exifUtil: ExifUtil) {
        this.dataType = dataType;
        this.exifUtil = exifUtil;
    }

    public withFileName(): PropertyReader {
        if (!this.propertiesToRead.includes("FileName")) {
            this.propertiesToRead.push("FileName");
        }
        return this;
    }

    public withDirectory(): PropertyReader {
        if (!this.propertiesToRead.includes("Directory")) {
            this.propertiesToRead.push("Directory");
        }
        return this;
    }

    public withFileSize(): PropertyReader {
        if (!this.propertiesToRead.includes("FileSize")) {
            this.propertiesToRead.push("FileSize");
        }
        return this;
    }

    public withLastModified(): PropertyReader {
        if (!this.propertiesToRead.includes("FileModifyDate")) {
            this.propertiesToRead.push("FileModifyDate");
        }
        return this;
    }

    public withLastAccessed(): PropertyReader {
        if (!this.propertiesToRead.includes("FileAccessDate")) {
            this.propertiesToRead.push("FileAccessDate");
        }
        return this;
    }

    public withCreatedDate(): PropertyReader {
        if (!this.propertiesToRead.includes("FileCreatedDate")) {
            this.propertiesToRead.push("FileCreatedDate");
        }
        return this;
    }

    public withFileType(): PropertyReader {
        if (!this.propertiesToRead.includes("FileType")) {
            this.propertiesToRead.push("FileType");
        }
        return this;
    }

    public withFileExtension(): PropertyReader {
        if (!this.propertiesToRead.includes("FileTypeExtension")) {
            this.propertiesToRead.push("FileTypeExtension");
        }
        return this;
    }

    public withMIMEType(): PropertyReader {
        if (!this.propertiesToRead.includes("MIMEType")) {
            this.propertiesToRead.push("MIMEType");
        }
        return this;
    }

    public withFilePermissions(): PropertyReader {
        if (!this.propertiesToRead.includes("FilePermissions")) {
            this.propertiesToRead.push("FilePermissions");
        }
        return this;
    }

    /**
     * For properties that don't have their own function. 
     * Take a look in the other classes in this folder 
     * if you can't find a property here before using this function,
     * since this function isn't as reliable.
     * @param property a string that is the name of a property that doesn't have its own function
     * @returns  to chain property selection
     */
    public withProperty(property: string): PropertyReader {
        if (!this.propertiesToRead.includes(property)) {
            this.propertiesToRead.push(property);
        }
        return this;
    }

    /**
     * @returns a {@link Reader} with the properties that have been selected.
     */
    public getReader(): Reader {
        if (this.dataType === DataType.CSV) {
            return new CSVReader(this.exifUtil, this.propertiesToRead);
        }
        if (this.dataType === DataType.HTML) {
            return new HTMLReader(this.exifUtil, this.propertiesToRead);
        }
        if (this.dataType === DataType.JSON) {
            return new JSONReader(this.exifUtil, this.propertiesToRead);
        }
        throw new Error("Unsupported data type.")
    }
}