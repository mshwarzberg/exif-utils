import { exifUtil } from "../values"
import Converter from "../../src/convert/converter";

describe("conversion testing", () => {
    const csvReader = exifUtil.csvReader();
    const jsonReader = exifUtil.jsonReader();
    const htmlReader = exifUtil.htmlReader();

    it("tests csv to json conversion", () => {
        // remove last access because there are issues with the value being different
        const json = jsonReader.withoutLastAccessed().readSync() as Record<string, any>[];
        const csv = csvReader.withoutLastAccessed().readSync() as string;
        const csvToJson = Converter.csvToJson(csv);

        // compare csvToJson to original json
        csvToJson.forEach((file: Record<string, any>, index: number) => {
            const propertyNames = Object.keys(file)
            for (const key of propertyNames) {
                expect(file[key]).toEqual(json[index][key]);
            }
        })

        jsonReader.clearExcludedProperties();
        jsonReader.clearIncludedProperties();
        csvReader.clearExcludedProperties();
        csvReader.clearIncludedProperties();
    });
    it("tests json to csv conversion", () => {
        // use inclusion list due to the way conversions are done
        const json = jsonReader
            .withFilePath()
            .withFileName()
            .withFilePermissions()
            .withDirectory()
            .readSync() as Record<string, any>[];
        const csv = csvReader
            .withFilePath()
            .withFileName()
            .withFilePermissions()
            .withDirectory()
            .readSync() as string;

        const jsonToCsv = Converter.jsonToCsv(json);

        // compare jsonToCsv to original json
        expect(jsonToCsv).toEqual(csv);
        jsonReader.clearExcludedProperties();
        jsonReader.clearIncludedProperties();
        csvReader.clearExcludedProperties();
        csvReader.clearIncludedProperties();
    });
    it("tests json to html conversion", () => {
        const json = jsonReader
            .withFileName()
            .withFileSize()
            .withFilePath()
            .readSync() as Record<string, any>[];
        const html = htmlReader
            .withFilePath()
            .withFileName()
            .withFileSize()
            .withFilePath()
            .readSync() as string;
        const jsonToHtml = Converter.jsonToHtml(json);

        expect(jsonToHtml).toEqual(html);
        jsonReader.clearExcludedProperties();
        jsonReader.clearIncludedProperties();
        csvReader.clearExcludedProperties();
        csvReader.clearIncludedProperties();
    })
})