import { exifUtil } from "../values"

describe("Test whether the correct properties are returned and in the correct data type", () => {
    it("tests inclusion of properties", () => {
        const jsonReader = exifUtil.jsonReader();
        // select the properties you want. Duplicates should be ignored
        jsonReader
            .filePropertyBuilder
            .withFileName()
            .withFileSize()
            .withFileType()
            .withFileName();

        // read the data
        const json = jsonReader.readSync();

        // validate the json output
        json.forEach((file) => {
            expect(file).toHaveProperty('FileName');
            expect(file).toHaveProperty('FileType');
            expect(file).toHaveProperty('FileSize');
            const numProperties = Object.keys(file).length;
            // include the SourceFile property.
            expect(numProperties).toBe(4);
        });
    });
    it("tests empty property reader", () => {
        const jsonReader = exifUtil.jsonReader();
        const json = jsonReader.readSync() as Record<string, any>[];
        json.forEach((file) => {
            expect(file).toHaveProperty('SourceFile');
            const numProperties = Object.keys(file).length;
            // there are 10 base properties for all files
            expect(numProperties).toBeGreaterThan(10);
        });
    });
    it("tests exclusion of properties", () => {
        const jsonReader = exifUtil.jsonReader();
        jsonReader
            .filePropertyBuilder
            .withoutFileSize()
            .withoutMIMEType()
            .withoutDirectory();
        const json = jsonReader.readSync();
        json.forEach(file => {
            expect(file).not.toHaveProperty("FileSize")
            expect(file).not.toHaveProperty("MIMEType")
            expect(file).not.toHaveProperty("Directory")
        })
    })
})