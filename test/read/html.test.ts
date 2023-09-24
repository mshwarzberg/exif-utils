import { exifUtil } from "../values"

describe("tests the html reader", () => {
    const htmlReader = exifUtil.htmlReader();
    it('should read html synchronously', () => {
        const pngResult = htmlReader.readSync();        
        // expect(pngResult.startsWith("error,")).not.toBeTruthy();
    });

    it('should read html asynchronously', async () => {
        const pngResult = await htmlReader.readAsync();
        // expect(pngResult.startsWith("error,")).not.toBeTruthy();
    });
})