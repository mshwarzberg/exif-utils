import { exifUtil } from "../values"

describe("tests the the default format output reader", () => {
    const defaultReader = exifUtil.defaultReader();
    it('should read the default format output synchronously', () => {
        const result = defaultReader.readSync();
        expect(result.startsWith("error")).not.toBeTruthy();
    });
    it('should read the default format output asynchronously', async () => {
        const result = await defaultReader.readAsync();
        expect(result.startsWith("error")).not.toBeTruthy();
    });
})