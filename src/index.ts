const { execSync } = require("child_process");
const path = require("path");
const util = require("util");
const execAsync = util.promisify(require("child_process").exec);
const exiftoolPath = path.join(__dirname, '../resources/exiftool.exe');
const os = require('os');

function validateOS() {
    const supportedOS = ["win32"];

    if (!supportedOS.includes(os.platform())) {
        throw new Error("Your OS isn't supported")
    }
}

validateOS();

export class ExifUtil {
    scanPath: string;

    constructor(scanPath: string) {
        this.scanPath = scanPath;
    }

    /**
     * This reads a file's or folder's content metadata. 
     * @param path the location of the file or folder you want to read
     * @returns json of the exif data or json with a single element of key "error" and value of the error message
     */
    readMetadataSync(): Array<Record<string, any>> {
        const command = `"${exiftoolPath}" -j "${this.scanPath}"`;
        try {
            const result = execSync(command).toString();
            const parsedResult = JSON.parse(result);
            return parsedResult;
        } catch (error: any) {
            return [{ error: error.message }];
        }
    }

    async readMetadata() {
        const command = `"${exiftoolPath}" -j "${this.scanPath}"`;
        try {
            const { stdout } = await execAsync(command);
            const parsedResult = JSON.parse(stdout);
            return parsedResult;
        } catch (error: any) {
            return [{ error: error.message }];
        }
    }
}
