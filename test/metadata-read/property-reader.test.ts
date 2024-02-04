import JSONReader from '../../src/metadata-read/data-types/json-reader';
import { exifUtil } from '../values';

describe('Test whether the correct properties are returned and in the correct data type', () => {
	let jsonReader: JSONReader;

	beforeEach(() => {
		jsonReader = exifUtil.jsonReader();
	});

	it('tests inclusion of properties', () => {
		// select the properties you want. Duplicates should be ignored
		jsonReader.getFilePropertyBuilder()
			.withFileName()
			.withFileSize()
			.withFileType()
			.withFileName();

		// read the data
		const json = jsonReader.executeSync();

		// validate the json output
		json.forEach((file) => {
			expect(file).toHaveProperty('FileName');
			expect(file).toHaveProperty('FileType');
			expect(file).toHaveProperty('FileSize');
			const numProperties = Object.keys(file).length;
			// include the SourceFile property.
			expect(numProperties)
				.toBe(4);
		});
	});

	it('tests empty property reader', () => {
		const json = jsonReader.executeSync();
		json.forEach((file) => {
			expect(file).toHaveProperty('SourceFile');
			const numProperties = Object.keys(file).length;
			// there are 10 base properties for all files
			expect(numProperties)
				.toBeGreaterThan(10);
		});
	});

	it('tests exclusion of properties', () => {
		jsonReader.getFilePropertyBuilder()
			.withoutFileSize()
			.withoutMIMEType()
			.withoutDirectory();
		const json = jsonReader.executeSync();
		json.forEach((file) => {
			expect(file).not.toHaveProperty('FileSize');
			expect(file).not.toHaveProperty('MIMEType');
			expect(file).not.toHaveProperty('Directory');
		});
	});
});
