import { exifUtil } from "../values"
import Converter from "../../src/converter/converter";

describe("conversion testing", () => {
    const csvReader = exifUtil.csvReader();
    const JSONReader = exifUtil.jsonReader();
    it("should return a json value identical to one converted from csv", () => {
        const json = JSONReader.readSync();
        const csv = csvReader.readSync();
        const csvToJson = Converter.csvToJson(csv);
        // currently cannot test this.
        const jsonToCsv = Converter.jsonToCsv(json);
        // compare csvToJson to original json
        expect(csvToJson[0]['FileName']).toEqual(json[0]['FileName']);
        expect(csvToJson[0]['FileSize']).toEqual(json[0]['FileSize']);
        expect(csvToJson[0]['FileType']).toEqual(json[0]['FileType']);
        expect(csvToJson[0]['MIMEType']).toEqual(json[0]['MIMEType']);
        expect(csvToJson[0]['Directory']).toEqual(json[0]['Directory']);
    })
})