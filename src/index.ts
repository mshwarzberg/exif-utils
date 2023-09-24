import CSVReader from "./reader/csv";
import HTMLReader from "./reader/html";
import JSONReader from "./reader/json";

const path = require("path");
const os = require('os');
const util = require("util");
export const execAsync = util.promisify(require("child_process").exec);
export const { execSync } = require("child_process");

function validateOS() {
    const supportedOS = ["win32"];

    if (!supportedOS.includes(os.platform())) {
        throw new Error("Your OS isn't supported")
    }
}

validateOS();

export default class ExifUtil {
    /**
     * If one of the paths are invalid, extraction of metadata will fail.
     */
    private paths: string[];
    
    /**
     * The absolute path representation of exiftool executable.
     */
    static exifUtilPath: string = path.join(__dirname, '../resources/exiftool.exe');

    /**
     * @note paths can be overridden by using {@link setPaths}
     * @param paths any number of files or folders to be read
     */
    constructor(...paths: string[]) {
        this.paths = paths;
    }

    /**
     * @returns a new instance of {@link JSONReader}
     */
    public jsonReader(): JSONReader {
        return new JSONReader(this);
    }

    /**
     * @returns a new instance of {@link CSVReader}
     */
    public csvReader(): CSVReader {
        return new CSVReader(this);
    }

    /**
     * @returns a new instance of {@link HTMLReader}
     */
    public htmlReader(): HTMLReader {
        return new HTMLReader(this);
    }

    /**
     * This will update the paths of the instance of {@link ExifUtil}
     * This is more preferable than creating a new instance entirely in the case of updating the paths.
     * @param paths a list of paths that are to be scanned.
     */
    public setPaths(...paths: string[]): void {
        this.paths = paths;
    }

    /**
     * Get the array of paths.
     * @returns {string[]} The array of file {@link paths} to extract metadata from.
     */
    public getPaths(): string[] {
        return this.paths;
    }
}
