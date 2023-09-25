export default class Converter {
    /**
     * This function may be used to convert csv to json. 
     * It's really only useful if both csv and json are needed
     * - this removes blank properties from the csv
     * @param csv any string
     * @returns a json object. 
     */
    static csvToJson(csv: string): Record<string, any>[] {
        const lines = csv.trim().split('\n');
        const [header, ...data] = lines.map(line => line.replace(/\r/g, '').split(',')); // Remove '\r'
        return data.map(row => {
            const obj: Record<string, any> = {};
            header.forEach((key, index) => {
                const value = row[index].trim();
                key = key.trim();
                if (value !== '' && key !== "Warning") {
                    obj[key] = !isNaN(parseFloat(value)) && /^[0-9.]+$/.test(value) ? parseFloat(value) : value; // Check if value is entirely a number
                }
            });
            return obj;
        }).filter(row => Object.keys(row).length > 0); // Filter out rows with no properties
    }

    /**
    * This function may be used to convert json to csv. 
    * It's really only useful if both csv and json are needed
    * @param json any json object that is an array of objects
    * @returns a csv string
    */
    static jsonToCsv(json: Record<string, any>[]): string {
        if (json.length === 0) {
            return '';
        }

        const header = Object.keys(json[0]);
        const csvRows = [header.join(',')];

        json.forEach(item => {
            const row = header.map(key => {
                return item[key];
            });
            csvRows.push(row.join(','));
        }); 
        // add an extra row to match the csv returned by exiftool     
        return csvRows.join('\r\n') + "\r\n";
    }
}