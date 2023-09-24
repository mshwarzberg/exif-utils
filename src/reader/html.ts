import { ExifUtil, execAsync, execSync } from "..";
import { DataType, ProcessOutput } from "../types";
import Reader from "./reader";

export default class HTMLReader extends Reader {

    constructor(exifUtil: ExifUtil) {
        super(exifUtil, DataType.HTML)
    }

    /**
     * @override {@link Reader.readAsync}
     * @returns A {@link Promise} that resolves with a stringified html table of the exif data or one with an error message
     */
    async readAsync(): Promise<string> {
        try {
            const result: ProcessOutput = await execAsync(this.getCMD());
            return result.stdout;
        } catch (error: any) {
            const errorResult: string = `<table><tr><td>error</td><td>${error.message}</td></tr></table>`;
            return errorResult;
        }
    }

    /**
     * @override {@link Reader.readSync}
     * @returns A stringified html table of the exif data or one with an error message
     */
    readSync(): string {
        try {
            const result: string = execSync(this.getCMD()).toString();
            return result;
        } catch (error: any) {
            const errorResult: string = `<table><tr><td>error</td><td>${error.message}</td></tr></table>`;
            return errorResult;
        }
    }
}