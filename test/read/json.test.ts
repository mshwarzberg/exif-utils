import JSONReader from "../../src/read/json";
import { exifUtil, invalidTestPath, testPath } from "../values";

describe("should read json from test image", () => {

    let jsonReader: JSONReader;

    it('should read json synchronously', () => {
        jsonReader = exifUtil.jsonReader()
        const result = jsonReader.readSync();
        expect(result[0].error).not.toBeDefined();
    });

    it('should read json asynchronously', async () => {
        jsonReader = exifUtil.jsonReader()
        const result = await jsonReader.readAsync();
        expect(result[0].error).not.toBeDefined();
    });

    it('should fail to read json synchronously', () => {
        jsonReader = exifUtil.jsonReader()
        exifUtil.setPaths(invalidTestPath);
        const result = jsonReader.readSync();
        expect(result[0].error).toBeTruthy()
        expect(result[0].stack).toBeTruthy()
        exifUtil.setPaths(testPath);
    });

    it('should fail to read json asynchronously', async () => {
        jsonReader = exifUtil.jsonReader()
        exifUtil.setPaths(invalidTestPath);

        const result = await jsonReader.readAsync();
        expect(result[0].error).toBeTruthy()
        expect(result[0].stack).toBeTruthy()
        exifUtil.setPaths(testPath);
    });
})