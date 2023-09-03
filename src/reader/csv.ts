import { ExifUtil } from "..";
import { Reader } from "./reader";
import util from 'util';
import { execSync } from 'child_process';

const execAsync = util.promisify(require("child_process").exec);

export class CSVReader extends Reader {

    constructor(exifUtil: ExifUtil) {
        super(exifUtil)
    }

    /**
     * @asynchronous This reads a file's or folder's content metadata. 
     * @returns csv of the exif data or an error message
     */
    async readAsync(): Promise<string> {
        const command = `"${ExifUtil.exifUtilPath}" -csv "${this.exifUtil.getScanPath()}"`;
        try {
            const result = await execAsync(command);
            return result.stdout;
        } catch (error: any) {
            return "error," + error.message;
        }
    }

    /**
     * @synchronous This reads a file's or folder's content metadata. 
     * @returns json of the exif data or json with a single element of key "error" and value of the error message
     */
    readSync(): string {
        const command = `"${ExifUtil.exifUtilPath}" -csv "${this.exifUtil.getScanPath()}"`;
        try {
            return execSync(command).toString();
        } catch (error: any) {
            return "error," + error.message;
        }
    }
}