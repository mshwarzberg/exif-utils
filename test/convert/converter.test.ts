import { exifUtil } from '../values';
import Converter from '../../src/convert/converter';

describe('conversion testing', () => {
	const csvReader = exifUtil.csvReader();
	const jsonReader = exifUtil.jsonReader();
	const htmlReader = exifUtil.htmlReader();

	it('tests csv to json conversion', () => {
		// remove last access because there are issues with the value being different
		jsonReader.getFilePropertyBuilder().withoutLastAccessed();
		csvReader.getFilePropertyBuilder().withoutLastAccessed();
		const json = jsonReader.readSync() as Record<string, unknown>[];
		const csv = csvReader.readSync() as string;
		const csvToJson = Converter.csvToJson(csv);

		// compare csvToJson to original json
		csvToJson.forEach((file: Record<string, unknown>, index: number) => {
			const propertyNames = Object.keys(file);
			for (const key of propertyNames) {
				expect(file[key]).toEqual(json[index][key]);
			}
		});

		clearProperties();
	});
	it('tests json to csv conversion', () => {
		// use inclusion list due to the way conversions are done
		jsonReader
			.getFilePropertyBuilder()
			.withFilePath()
			.withFileName()
			.withFilePermissions()
			.withDirectory();
		const json = jsonReader.readSync() as Record<string, unknown>[];
		csvReader
			.getFilePropertyBuilder()
			.withFilePath()
			.withFileName()
			.withFilePermissions()
			.withDirectory();
		const csv = csvReader.readSync() as string;

		const jsonToCsv = Converter.jsonToCsv(json);

		// compare jsonToCsv to original json
		expect(jsonToCsv).toEqual(csv);
		clearProperties();
	});
	it('tests json to html conversion', () => {
		jsonReader
			.getFilePropertyBuilder()
			.withFileName()
			.withFileSize()
			.withFilePath();
		const json = jsonReader.readSync() as Record<string, unknown>[];
		htmlReader
			.getFilePropertyBuilder()
			.withFilePath()
			.withFileName()
			.withFileSize()
			.withFilePath();
		const html = htmlReader.readSync() as string;
		const jsonToHtml = Converter.jsonToHtml(json);

		expect(jsonToHtml).toEqual(html);
		clearProperties();
	});

	function clearProperties(): void {
		jsonReader.getFilePropertyBuilder().clearExcludedProperties();
		jsonReader.getFilePropertyBuilder().clearIncludedProperties();
		csvReader.getFilePropertyBuilder().clearExcludedProperties();
		csvReader.getFilePropertyBuilder().clearIncludedProperties();
	}
});
