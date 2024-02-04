import { type ExifUtil, execAsync, execSync } from '../../exif-utils';
import { JSONType } from '../../core/abstract';
import { ProcessOutput } from '../../core/interfaces';
import { DataType } from '../../core/types';
import MetadataReader from '../metadata-reader';

export default class JSONReader extends MetadataReader {
	constructor(exifUtil: ExifUtil) {
		super(exifUtil, DataType.JSON);
	}

	/**
     * @override {@link ExecutableCommand.executeAsync}
     * @returns A {@link Promise} that resolves with json or an Object with a single element containing an error result
     */
	async executeAsync(): Promise<Array<Record<string, unknown>>> {
		try {
			const result: ProcessOutput = await execAsync(this.getCMD());
			return JSON.parse(result.stdout);
		} catch (error: unknown) {
			return JSONType.getError(error);
		}
	}

	/**
     * @override {@link ExecutableCommand.executeSync}
     * @returns json or an Object containing single element containing an error result
     */
	executeSync(): Array<Record<string, unknown>> {
		try {
			const result = String(execSync(this.getCMD()));
			return JSON.parse(result);
		} catch (error: unknown) {
			return JSONType.getError(error);
		}
	}
}
