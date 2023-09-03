import { exifUtil } from "../values";

describe("should read json from test image", () => {
    const jsonReader = exifUtil.jsonReader();
    it('should read json synchronously', () => {
        const pngResult = jsonReader.readSync();
        expect(pngResult[0].error).not.toBeDefined();
        expect(pngResult[0].FileName).toBe('test.png');
        expect(pngResult[0].MIMEType).toBe('image/png');
    });

    it('should read json asynchronously', async () => {
        const pngResult = await jsonReader.readAsync();
        expect(pngResult[0].error).not.toBeDefined();
        expect(pngResult[0].FileName).toBe('test.png');
        expect(pngResult[0].MIMEType).toBe('image/png');
    });

})