const { expect } = require('chai');
const { default: readMetadata } = require('../dist');

describe('Exists Test', () => {
    it('should read metadata using exiftool', () => {
        try {
            const pngResult = readMetadata("./test/test.png");
            expect(pngResult.FileName).to.equal('test.png');
            expect(pngResult.MIMEType).to.equal('image/png');
        
        } catch (error) {
            throw new Error(`Error executing exiftool: ${error.message}`);
        }
    });
});