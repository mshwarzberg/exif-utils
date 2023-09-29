import { exifUtil } from "../values"
import Converter from "../../src/convert/converter";

describe("conversion testing", () => {
    const csvReader = exifUtil.csvReader();
    const jsonReader = exifUtil.jsonReader();
    const htmlReader = exifUtil.htmlReader();

    it("tests csv to json conversion", () => {
        // remove last access because there are issues with the value being different
        jsonReader.filePropertyBuilder.withoutLastAccessed();
        csvReader.filePropertyBuilder.withoutLastAccessed();
        const json = jsonReader.readSync() as Record<string, any>[];
        const csv = csvReader.readSync() as string;
        const csvToJson = Converter.csvToJson(csv);

        // compare csvToJson to original json
        csvToJson.forEach((file: Record<string, any>, index: number) => {
            const propertyNames = Object.keys(file)
            for (const key of propertyNames) {
                expect(file[key]).toEqual(json[index][key]);
            }
        })

        jsonReader.filePropertyBuilder.clearExcludedProperties();
        jsonReader.filePropertyBuilder.clearIncludedProperties();
        csvReader.filePropertyBuilder.clearExcludedProperties();
        csvReader.filePropertyBuilder.clearIncludedProperties();
    });
    it("tests json to csv conversion", () => {
        // use inclusion list due to the way conversions are done
        jsonReader
            .filePropertyBuilder.withFilePath()
            .withFileName()
            .withFilePermissions()
            .withDirectory()
        const json = jsonReader.readSync() as Record<string, any>[];
        csvReader
            .filePropertyBuilder.withFilePath()
            .withFileName()
            .withFilePermissions()
            .withDirectory()
        const csv = csvReader.readSync() as string;

        const jsonToCsv = Converter.jsonToCsv(json);

        // compare jsonToCsv to original json
        expect(jsonToCsv).toEqual(csv);
        jsonReader.filePropertyBuilder.clearExcludedProperties();
        jsonReader.filePropertyBuilder.clearIncludedProperties();
        csvReader.filePropertyBuilder.clearExcludedProperties();
        csvReader.filePropertyBuilder.clearIncludedProperties();
    });
    it("tests json to html conversion", () => {
        jsonReader
            .filePropertyBuilder
            .withFileName()
            .withFileSize()
            .withFilePath()
        const json = jsonReader.readSync() as Record<string, any>[];
        htmlReader
            .filePropertyBuilder.withFilePath()
            .withFileName()
            .withFileSize()
            .withFilePath()
        const html = htmlReader.readSync() as string;
        const jsonToHtml = Converter.jsonToHtml(json);

        expect(jsonToHtml).toEqual(html);
        jsonReader.filePropertyBuilder.clearExcludedProperties();
        jsonReader.filePropertyBuilder.clearIncludedProperties();
        csvReader.filePropertyBuilder.clearExcludedProperties();
        csvReader.filePropertyBuilder.clearIncludedProperties();
    })
})