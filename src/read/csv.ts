import { ExifUtil, execAsync, execSync } from "..";
import { DataType } from "../types";
import Reader from "./reader";

export default class CSVReader extends Reader {
    /**
     * @param exifUtil - An instance of the {@link ExifUtil} class, used for handling file paths.
     * @param properties an optional array of properties. If it's undefined all properties will be read
     */
    constructor(exifUtil: ExifUtil) {
        super(exifUtil, DataType.CSV);
    }

    /**
     * @override {@link Reader.readAsync}
     * @returns A {@link Promise} that resolves with csv of the exif data or one with an error message
     */
    async readAsync(): Promise<string> {
        try {
            const result = await execAsync(this.getCMD());
            return result.stdout;
        } catch (error: any) {
            return this.getErrorPlaceholder(error);
        }
    }

    /**
     * @override {@link Reader.readSync}
     * @returns csv of the exif data or one with an error message
     */
    readSync(): string {
        try {
            return execSync(this.getCMD()).toString();
        } catch (error: any) {
            return this.getErrorPlaceholder(error);
        }
    }

    public getErrorPlaceholder(error: any): string {
        return `Error,Stack\r\n${error.message},${error.stack}`;
    }
}