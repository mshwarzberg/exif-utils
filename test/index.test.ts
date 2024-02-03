import { ExifUtil } from '../src/index';
import { exifUtil, exifToolPath, testPath } from './values';

describe('Application Test', () => {
	it('validates exiftool location', () => {
		expect(exifToolPath).toBe(ExifUtil.exifToolPath);
	});
	it('validates correct scan path', () => {
		const tempPath = 'test path';
		// Initial check before modification
		expect(exifUtil.getPaths()).toStrictEqual([testPath]);

		// Modify the path and check
		exifUtil.setPaths(tempPath);
		expect(exifUtil.getPaths()).toStrictEqual([tempPath]);

		// Reset the path and check again
		exifUtil.setPaths(testPath);
		expect(exifUtil.getPaths()).toStrictEqual([testPath]);
	});
});
