import { exifUtil } from "../values"

describe("tests the csv reader", () => {
    const csvReader = exifUtil.csvReader();
    it('should read csv synchronously', () => {
        const pngResult = csvReader.readSync();
        expect(pngResult.startsWith("error,")).not.toBeTruthy();
    });

    it('should read csv asynchronously', async () => {
        const pngResult = await csvReader.readAsync();
        expect(pngResult.startsWith("error,")).not.toBeTruthy();
    });
})