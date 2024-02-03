import { type ExifUtil, execAsync, execSync } from '../..';
import { DataType, Err } from '../../core/types';
import { ProcessOutput } from '../../core/interfaces';
import Reader from '../reader';

export default class HTMLReader extends Reader {
	constructor(exifUtil: ExifUtil) {
		super(exifUtil, DataType.HTML);
	}

	/**
   * @override {@link Reader.readAsync}
   * @returns A {@link Promise} that resolves with a stringified html table of the exif data or one with an error message
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
   * @returns A stringified html table of the exif data or one with an error message
   */
	readSync(): string {
		try {
			return execSync(this.getCMD()).toString();
		} catch (error: unknown) {
			return this.getErrorPlaceholder(error);
		}
	}

	getErrorPlaceholder(error: Err): string {
		return `<!-- Error --><table><tr><td>message</td><td>${error.message}</td></tr><<tr></tr><td>stack</td><td>${error.stack}</td></table>`;
	}
}
