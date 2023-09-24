import ExifUtil, { execAsync, execSync } from "..";
import { DataType, ProcessOutput } from "../types";
import Reader from "./reader";

export default class JSONReader extends Reader {
    constructor(exifUtil: ExifUtil) {
        super(exifUtil, DataType.JSON)
    }

    /**
     * @override {@link Reader.readAsync}
     * @returns A {@link Promise} that resolves with json or an Object with a single element containing an error result
     */
    async readAsync(): Promise<Record<string, any>> {
        try {
            const result: ProcessOutput = await execAsync(this.getCMD());
            return JSON.parse(result.stdout);
        } catch (error: any) {
            return [{ error: error.message }];
        }
    }

    /**
     * @override {@link Reader.readSync}
     * @returns json or an Object containing single element containing an error result
     */
    readSync(): Array<Record<string, any>> {
        try {
            const result = execSync(this.getCMD()).toString();
            return JSON.parse(result);
        } catch (error: any) {
            return [{ error: error.message }];
        }
    }
}