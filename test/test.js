const { expect } = require('chai');
const { ExifUtil } = require('../dist');
const exifutil = new ExifUtil("./test/test.png");

describe('Exists Test Sync', () => {
    it('should read metadata using exiftool', () => {
        try {
            const pngResult = exifutil.readMetadataSync();
            expect(pngResult[0].error).not.to.exist;
            expect(pngResult[0].FileName).to.equal('test.png');
            expect(pngResult[0].MIMEType).to.equal('image/png');

        } catch (error) {
            throw new Error(`Error executing exiftool: ${error.message}`);
        }
    });
});

describe('Exists Test Async', () => {
    it('should read metadata using exiftool', async () => {
        try {
            const pngResult = await exifutil.readMetadata();
            expect(pngResult[0].error).not.to.exist;
            expect(pngResult[0].FileName).to.equal('test.png');
            expect(pngResult[0].MIMEType).to.equal('image/png');

        } catch (error) {
            throw new Error(`Error executing exiftool: ${error.message}`);
        }
    });
})