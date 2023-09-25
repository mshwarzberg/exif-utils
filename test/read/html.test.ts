import { exifUtil } from "../values"

describe("tests the html reader", () => {
    const htmlReader = exifUtil.htmlReader();
    it('should read html synchronously', () => {
        const result = htmlReader.readSync();        
        expect(result.startsWith("table><tr><td>error</td><td>")).not.toBeTruthy();
    });

    it('should read html asynchronously', async () => {
        const result = await htmlReader.readAsync();
        expect(result.startsWith("table><tr><td>error</td><td>")).not.toBeTruthy();
    });
})