import { exifUtil } from "../values"
import Converter from "../../src/converter/converter";

describe("conversion testing", () => {
    const csvReader = exifUtil.csvReader();
    const jsonReader = exifUtil.jsonReader();
    it("should return a json value identical to one converted from csv", () => {
        const csvToJson = Converter.toJson(csvReader.readSync());
        const json = jsonReader.readSync();
        expect(csvToJson).toEqual(json);
    })
})