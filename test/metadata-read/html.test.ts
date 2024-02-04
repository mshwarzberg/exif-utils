import HTMLReader from '../../src/metadata-read/data-types/html-reader';
import { exifUtil, invalidTestPath, testPath } from '../values';

describe('tests the html reader', () => {
	const errorRegex = /<!-- Error --><table><tr><td>message<\/td><td>[\s\S]*?<\/td><\/tr><<tr><\/tr><td>stack<\/td><td>[\s\S]*?<\/td><\/table>/;
	let htmlReader: HTMLReader;
	it('should read html synchronously', () => {
		htmlReader = exifUtil.htmlReader();
		const result = htmlReader.executeSync();

		expect(result.match(errorRegex)).not.toBeTruthy();
	});

	it('should read html asynchronously', async () => {
		htmlReader = exifUtil.htmlReader();
		const result = await htmlReader.executeAsync();
		expect(result.match(errorRegex)).not.toBeTruthy();
	});

	it('should fail to read html synchronously', () => {
		htmlReader = exifUtil.htmlReader();
		exifUtil.setPaths(invalidTestPath);
		const result = htmlReader.executeSync();

		expect(result.match(errorRegex)).toBeTruthy();
		exifUtil.setPaths(testPath);
	});

	it('should fail to read html asynchronously', async () => {
		htmlReader = exifUtil.htmlReader();
		exifUtil.setPaths(invalidTestPath);

		const result = await htmlReader.executeAsync();
		expect(result.match(errorRegex)).toBeTruthy();
		exifUtil.setPaths(testPath);
	});
});
