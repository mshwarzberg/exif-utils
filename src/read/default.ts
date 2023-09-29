import { ExifUtil, execAsync, execSync } from "..";
import { DataType, ProcessOutput } from "../types";
import Reader from "./reader";

/**
 * @alert This class will not return the file path (SourceFile) in the output unless explicitly selected.
 */
export default class DefaultReader extends Reader {

    constructor(exifUtil: ExifUtil) {
        super(exifUtil, DataType.DEFAULT)
    }

    /**
     * @override {@link Reader.readAsync}
     * @returns A {@link Promise} that resolves with a simple string representation of the exif data or one with an error message
     */
    async readAsync(): Promise<string> {
        try {
            const result: ProcessOutput = await execAsync(this.getCMD());
            return result.stdout;
        } catch (error: any) {
            return this.getErrorPlaceholder(error);
        }
    }

    /**
     * @override {@link Reader.readSync}
     * @returns A simple string representation of the exif data or one with an error message
     */
    readSync(): string {
        try {
            const result: string = execSync(this.getCMD()).toString();
            return result;
        } catch (error: any) {
            return this.getErrorPlaceholder(error);
        }
    }

    getErrorPlaceholder(error: any): string {
        return  `error: ${error.message}\r\nstack: ${error.stack}`;
    }
}