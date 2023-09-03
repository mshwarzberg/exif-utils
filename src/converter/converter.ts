export default class Converter {
    /**
     * This function may be used to convert csv to json. 
     * It's really only useful if both csv and json are needed
     * @param csv any string
     * @returns a json object. 
     */
    static toJson(csv: string): Array<Record<string, any>> {
        const lines = csv.trim().split('\n');
        const [header, ...data] = lines.map(line => line.replace(/\r/g, '').split(',')); // Remove '\r'
        return data.map(row => {
            const obj: Record<string, any> = {};
            header.forEach((key, index) => {
                const value = row[index].trim();
                obj[key] = !isNaN(parseFloat(value)) && /^[0-9.]+$/.test(value) ? parseFloat(value) : value; // Check if value is entirely a number
            });
            return obj;
        });
    }
    
    
}