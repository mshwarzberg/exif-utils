import { exifUtil } from "../values";

describe("should read json from test image", () => {
    const JSONReader = exifUtil.jsonReader();
    it('should read json synchronously', () => {
        const result = JSONReader.readSync();
        expect(result[0].error).not.toBeDefined();
    });

    it('should read json asynchronously', async () => {
        const result = await JSONReader.readAsync();
        expect(result[0].error).not.toBeDefined();
    });

})