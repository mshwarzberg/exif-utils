import { type ExifUtil, execAsync, execSync } from '../..';
import { ProcessOutput } from '../../core/interfaces';
import { DataType, Err } from '../../core/types';
import Reader from '../reader';

export default class XMLReader extends Reader {
	constructor(exifUtil: ExifUtil) {
		super(exifUtil, DataType.XML);
	}

	/**
     * @override {@link Reader.readAsync}
     * @returns A {@link Promise} that resolves with a stringified xml table of the exif data or one with an error message
     */
	async readAsync(): Promise<string> {
		try {
			const result: ProcessOutput = await execAsync(this.getCMD());
			return result.stdout;
		} catch (error: unknown) {
			return this.getErrorPlaceholder(error);
		}
	}

	/**
     * @override {@link Reader.readSync}
     * @returns A stringified xml table of the exif data or one with an error message
     */
	readSync(): string {
		try {
			const result: string = execSync(this.getCMD()).toString();
			return result;
		} catch (error: unknown) {
			return this.getErrorPlaceholder(error);
		}
	}

	getErrorPlaceholder(error: Err): string {
		return `<error><message>${error.message}</message><stack>${error.stack}</stack></error>`;
	}
}
