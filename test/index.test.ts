import { ExifUtil } from '../src/index';
import { exifUtil, exifUtilPath, testImagePath } from './values';

describe('Application Test', () => {
    it("validates exiftool location", () => {
        expect(exifUtilPath).toBe(ExifUtil.exifUtilPath);
    });
    it("validates correct scan path", () => {
        const tempPath = "test path";
        expect(exifUtil.getScanPath()).toBe(testImagePath);
        exifUtil.setScanPath(tempPath);
        expect(exifUtil.getScanPath()).toBe(tempPath);
        exifUtil.setScanPath(testImagePath);
        expect(exifUtil.getScanPath()).toBe(testImagePath);
    });
});