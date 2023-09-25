import { ExifUtil } from "../src";
import path from 'path';

export const testImagePath = "./test/Test Files";
export const exifUtil = new ExifUtil(testImagePath);
export const exifToolPath = path.join(__dirname, '../resources/exiftool.exe');