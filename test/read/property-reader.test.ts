import { exifUtil } from "../values"

describe("Test whether the correct properties are returned and in the correct data type", () => {
    it("tests inclusion of properties", () => {
        const jsonReader = exifUtil.jsonReader();
        expect(jsonReader.propertiesInclude).toHaveLength(0);
        // select the properties you want. Duplicates should be ignored
        jsonReader
            .withFileName()
            .withFileSize()
            .withFileType()
            .withFileName();

        // validate that there are 3 selected properties
        expect(jsonReader.propertiesInclude).toHaveLength(3);
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
        expect(jsonReader.propertiesInclude).toHaveLength(0);
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
        expect(jsonReader.propertiesExclude).toHaveLength(0);
        jsonReader
            .withoutFileSize()
            .withoutMIMEType()
            .withoutDirectory();
        expect(jsonReader.propertiesExclude).toHaveLength(3);
        const json = jsonReader.readSync();
        json.forEach(file => {
            expect(file).not.toHaveProperty("FileSize")
            expect(file).not.toHaveProperty("MIMEType")
            expect(file).not.toHaveProperty("Directory")
        })
    })
})