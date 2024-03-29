import CSVReader from '../../src/metadata-read/data-types/csv-reader';
import { exifUtil, invalidTestPath, testPath } from '../values';

describe('tests the csv reader', () => {
	const errorRegex = /^Error,Stack\r\n/;
	let csvReader: CSVReader;
	it('should read csv synchronously', () => {
		csvReader = exifUtil.csvReader();
		const pngResult = csvReader.executeSync();
		expect(pngResult.match(errorRegex)).not.toBeTruthy();
	});

	it('should read csv asynchronously', async () => {
		csvReader = exifUtil.csvReader();
		const pngResult = await csvReader.executeAsync();
		expect(pngResult.match(errorRegex)).not.toBeTruthy();
	});

	it('should fail to read csv synchronously', () => {
		csvReader = exifUtil.csvReader();
		exifUtil.setPaths(invalidTestPath);
		const pngResult = csvReader.executeSync();
		expect(pngResult.match(errorRegex)).toBeTruthy();
		exifUtil.setPaths(testPath);
	});

	it('should fail to read csv asynchronously', async () => {
		csvReader = exifUtil.csvReader();
		exifUtil.setPaths(invalidTestPath);
		const pngResult = await csvReader.executeAsync();
		expect(pngResult.match(errorRegex)).toBeTruthy();
		exifUtil.setPaths(testPath);
	});
});
