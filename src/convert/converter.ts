export default class Converter {
    /**
     * If there are an odd amount of double quotes in a string inside the csv the conversion will fail.
     * @note this removes blank properties from the csv
     * @param csv any string
     * @returns a json object. 
     */
    static csvToJson(csvString: string) {
        const files = csvString.split('\r\n');
        const result = [];
        // extract the headers from the first line of the csv
        const headers = files[0].split(',');
        
        // iterate through every file in the csv
        for (let i = 1; i < files.length; i++) {
            const file: string = files[i].trim();
            // if a line is empty go to the next one and don't add it to the result
            if (file === '') continue;
            // this holds the metadata. The values are kept by their index.
            const data: string[] = [];
            let isQuoted: boolean = false;
            let property: string = '';

            // iterate through the metadata one letter at a time
            for (let j = 0; j < file.length;) {
                const char = file[j];

                // if the character is a ',' and it isn't in a string it means that a property has been found
                if (char === ',' && !isQuoted) {
                    data.push(property);
                    // get the next property
                    property = '';
                    j++;
                } else if (char === '"') {
                    // if the '"' is at the beginning of a string it toggles isQuoted to true.
                    // otherwise, it's the end of a string and toggles it to false.
                    isQuoted = !isQuoted;
                    j++;

                    // first, verify that adding to j is still within bounds for the metadata
                    // second, check if the value is a '"'
                    if (j < file.length && file[j] === '"') {
                        property += '"';
                        j++;
                    }
                } else {
                    // chars that are not '"' or ',' are added to the property "builder"
                    property += char;
                    j++;
                }
            }
            
            data.push(property);

            const obj: any = {};
            for (let k = 0; k < headers.length; k++) {
                const key = headers[k];
                const value = data[k];
                // ignore empty values and the warning message
                if (value !== "" && key !== "Warning") {
                    obj[key] = !isNaN(parseFloat(value)) && /^[0-9.]+$/.test(value) ? parseFloat(value) : value;
                }
            }
            result.push(obj);

        }

        return result;
    }

    /**
    * An extra line is added to the end of the csv to match the exiftool csv
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
        return csvRows.join('\r\n') + "\r\n";
    }

    static jsonToHtml(json: Record<string, any>[]): string {
        return json.map(file => {
            const keys = Object.keys(file);
            let result = `<!-- ${file["SourceFile"]} -->\r\n<table>\r\n`;
            for (const key of keys) {
                if (key !== "SourceFile") {
                    result += `<tr><td>${key.split("File").join("File ")}</td><td>${file[key]}</td></tr>\r\n`;
                }
            }
            return result + "</table>";
        }).join("\r\n") + "\r\n";
    }
}