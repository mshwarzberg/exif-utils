import { CSVReader } from "./reader/csv";
import { JsonReader } from "./reader/json";

const path = require("path");
const os = require('os');

function validateOS() {
    const supportedOS = ["win32"];

    if (!supportedOS.includes(os.platform())) {
        throw new Error("Your OS isn't supported")
    }
}

validateOS();

export class ExifUtil {
    private scanPath: string;
    static exifUtilPath: string = path.join(__dirname, '../resources/exiftool.exe');

    constructor(scanPath: string) {
        this.scanPath = scanPath;
    }

    public jsonReader(): JsonReader {
        return new JsonReader(this);
    }

    public csvReader(): CSVReader {
        return new CSVReader(this);
    }
    
    public setScanPath(scanPath: string): void {
        this.scanPath = scanPath;
    }

    public getScanPath(): string {
        return this.scanPath;
    }
}
