const { execSync } = require("child_process");

const exiftoolPath = './resources/exiftool.exe';

export default function readMetadata(filePath: string): Record<string, any> {
    const command = `"${exiftoolPath}" -j "${filePath}"`;

    try {
        const result = execSync(command).toString();
        const parsedResult = JSON.parse(result);
        return parsedResult[0] || {};
    } catch (error: any) {
        throw new Error(`Error executing exiftool: ${error.message}`);
    }
}