import { exifUtil } from "../../values"

describe("Test whether the correct properties are returned and in the correct data type", () => {
    it("should validate selected properties", () => {
        const jsonPropertyReader = exifUtil.jsonPropertyReader();
        expect(jsonPropertyReader.propertiesToRead).toHaveLength(1);
        // jsonPropertyReader
        //     .withFileName()
        //     .withFileSize()
        //     .withFileType();
        // expect(jsonPropertyReader.propertiesToRead).toHaveLength(4);
        const json = jsonPropertyReader.getReader().readSync();
    });
    it("tests empty property reader", () => {
        const jsonPropertyReader = exifUtil.jsonPropertyReader();
        expect(jsonPropertyReader.propertiesToRead).toHaveLength(1);
        const json = jsonPropertyReader.getReader().readSync() as Array<Record<string, any>>;
        json.forEach((obj) => {
            expect(obj).toHaveProperty('SourceFile');
            const numProperties = Object.keys(obj).length;
            expect(numProperties).toBe(1);
        });
    })
})