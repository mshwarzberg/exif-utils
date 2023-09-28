import { ExifUtil } from '../src/index';
import { exifUtil, exifToolPath, testPath } from './values';

describe('Application Test', () => {
    it("validates exiftool location", () => {
        expect(exifToolPath).toBe(ExifUtil.exifToolPath);
    });
    it("validates correct scan path", () => {
        const tempPath = "test path";
        expect(exifUtil.getPaths()).toStrictEqual([testPath]);
        exifUtil.setPaths(tempPath);
        expect(exifUtil.getPaths()).toStrictEqual([tempPath]);
        exifUtil.setPaths(testPath);
        expect(exifUtil.getPaths()).toStrictEqual([testPath]);
    });
});