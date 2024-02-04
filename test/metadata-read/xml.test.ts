import XMLReader from '../../src/metadata-read/data-types/xml-reader';
import { exifUtil, testPath, invalidTestPath } from '../values';

describe('tests the xml reader', () => {
	let xmlReader: XMLReader;
	const errorRegex = /<error>\s*<message>([\s\S]*?)<\/message>\s*<stack>([\s\S]*?)<\/stack>\s*<\/error>/;
	it('should read xml synchronously', () => {
		xmlReader = exifUtil.xmlReader();
		const result = xmlReader.executeSync();
		expect(result.match(errorRegex)).not.toBeTruthy();
	});

	it('should read xml asynchronously', async () => {
		xmlReader = exifUtil.xmlReader();
		const result = await xmlReader.executeAsync();
		expect(result.match(errorRegex)).not.toBeTruthy();
	});

	it('should fail to read xml synchronously', () => {
		xmlReader = exifUtil.xmlReader();
		exifUtil.setPaths(invalidTestPath);
		const result = xmlReader.executeSync();
		expect(result.match(errorRegex)).toBeTruthy();
		exifUtil.setPaths(testPath);
	});

	it('should fail to read xml asynchronously', async () => {
		xmlReader = exifUtil.xmlReader();
		exifUtil.setPaths(invalidTestPath);
		const result = await xmlReader.executeAsync();
		expect(result.match(errorRegex)).toBeTruthy();
		exifUtil.setPaths(testPath);
	});
});
