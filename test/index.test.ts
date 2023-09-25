import { ExifUtil } from '../src/index';
import { exifUtil, exifToolPath, testImagePath } from './values';

describe('Application Test', () => {
    it("validates exiftool location", () => {
        expect(exifToolPath).toBe(ExifUtil.exifToolPath);
    });
    it("validates correct scan path", () => {
        const tempPath = "test path";
        expect(exifUtil.getPaths()).toStrictEqual([testImagePath]);
        exifUtil.setPaths(tempPath);
        expect(exifUtil.getPaths()).toStrictEqual([tempPath]);
        exifUtil.setPaths(testImagePath);
        expect(exifUtil.getPaths()).toStrictEqual([testImagePath]);
    });
});