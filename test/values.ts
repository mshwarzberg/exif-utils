import { ExifUtil } from '../src';
import path from 'path';

export const testPath = './test/Test Files';
export const invalidTestPath = 'this/path/does/not/exist';
export const exifUtil = new ExifUtil(testPath);
export const exifToolPath = path.join(__dirname, '../resources/exiftool.exe');
