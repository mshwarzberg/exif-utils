import { ExifUtil } from "..";
import { Reader } from "./reader";

const util = require("util");
const execAsync = util.promisify(require("child_process").exec);
const { execSync } = require("child_process");

export class JsonReader extends Reader {

    constructor(exifUtil: ExifUtil) {
        super(exifUtil)
    }

    /**
     * @asynchronous This reads a file's or folder's content metadata. 
     * @returns json of the exif data or json with a single element of key "error" and value of the error message
     */
    async readAsync(): Promise<Record<string, any>> {
        const command = `"${ExifUtil.exifUtilPath}" -json "${this.exifUtil.getScanPath()}"`;
        try {
            const { stdout } = await execAsync(command);
            const parsedResult = JSON.parse(stdout);
            return parsedResult;
        } catch (error: any) {
            return [{ error: error.message }];
        }
    }

    /**
     * @synchronous This reads a file's or folder's content metadata. 
     * @returns json of the exif data or json with a single element of key "error" and value of the error message
     */
    readSync(): Array<Record<string, any>> {
        const command = `"${ExifUtil.exifUtilPath}" -json "${this.exifUtil.getScanPath()}"`;
        try {
            const result = execSync(command).toString();
            const parsedResult = JSON.parse(result);
            return parsedResult;
        } catch (error: any) {
            return [{ error: error.message }];
        }
    }
}