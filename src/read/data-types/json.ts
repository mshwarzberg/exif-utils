import { type ExifUtil, execAsync, execSync } from '../..';
import { ProcessOutput } from '../../core/interfaces';
import { DataType, Err } from '../../core/types';
import Reader from '../reader';

export default class JSONReader extends Reader {
	constructor(exifUtil: ExifUtil) {
		super(exifUtil, DataType.JSON);
	}

	/**
     * @override {@link Reader.readAsync}
     * @returns A {@link Promise} that resolves with json or an Object with a single element containing an error result
     */
	async readAsync(): Promise<Array<Record<string, unknown>>> {
		try {
			const result: ProcessOutput = await execAsync(this.getCMD());
			return JSON.parse(result.stdout);
		} catch (error: unknown) {
			return this.getErrorPlaceholder(error);
		}
	}

	/**
     * @override {@link Reader.readSync}
     * @returns json or an Object containing single element containing an error result
     */
	readSync(): Array<Record<string, unknown>> {
		try {
			const result = execSync(this.getCMD()).toString();
			return JSON.parse(result);
		} catch (error: unknown) {
			return this.getErrorPlaceholder(error);
		}
	}

	getErrorPlaceholder(error: Err): Array<Record<string, unknown>> {
		return [{ error: error.message, stack:  error.stack }];
	}
}
