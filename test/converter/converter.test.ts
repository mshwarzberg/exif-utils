import { exifUtil } from "../values"
import Converter from "../../src/convert/converter";

describe("conversion testing", () => {
    const csvReader = exifUtil.csvReader();
    const jsonReader = exifUtil.jsonReader();
    it("should convert csv to json correctly", () => {
        // remove last access because there are issues with the value being different
        const json = jsonReader.withoutLastAccessed().readSync() as Record<string, any>[];
        const csv = csvReader.withoutLastAccessed().readSync() as string;
        const csvToJson = Converter.csvToJson(csv);

        // compare csvToJson to original json
        expect(csvToJson).toEqual(json);
    });
    it("should convert json to csv correctly", () => {
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
        // compare csvToJson to original json
        expect(jsonToCsv).toEqual(csv);

    })
})