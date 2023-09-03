import { ExifUtil } from "..";

export abstract class Reader {
    exifUtil: ExifUtil;
    
    constructor(exifUtil: ExifUtil) {
        this.exifUtil = exifUtil;
    }

    abstract readAsync(): Promise<Record<string, any>> | Promise<string>;

    abstract readSync(): Array<Record<string, any>> | string;
}