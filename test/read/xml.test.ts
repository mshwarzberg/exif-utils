import { exifUtil } from "../values"

describe("tests the xml reader", () => {
    const xmlReader = exifUtil.xmlReader();
    const regex = /<error>\s*<message>([\s\S]*?)<\/message>\s*<stack>([\s\S]*?)<\/stack>\s*<\/error>/;
    it('should read xml synchronously', () => {
        const result = xmlReader.readSync();
        expect(result.match(regex)).not.toBeTruthy();
    });

    it('should read xml asynchronously', async () => {
        const result = await xmlReader.readAsync();
        expect(result.match(regex)).not.toBeTruthy();
    });
})