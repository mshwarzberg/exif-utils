import { type ExifUtil, execAsync, execSync } from '../../exif-utils';
import { DataType } from '../../core/types';
import { ProcessOutput } from '../../core/interfaces';
import MetadataReader from '../metadata-reader';
import { HTMLType } from '../../core/abstract';

export default class HTMLReader extends MetadataReader {
	constructor(exifUtil: ExifUtil) {
		super(exifUtil, DataType.HTML);
	}

	/**
     * @override {@link ExecutableCommand.executeAsync}
     * @returns A {@link Promise} that resolves with a stringified html table of the exif data or one with an error message
     */
	async executeAsync(): Promise<string> {
		try {
			const result: ProcessOutput = await execAsync(this.getCMD());
			return result.stdout;
		} catch (error: unknown) {
			return HTMLType.getError(error);
		}
	}

	/**
     * @override {@link MetadataReader.executeSync}
     * @returns A stringified html table of the exif data or one with an error message
     */
	executeSync(): string {
		try {
			return String(execSync(this.getCMD()));
		} catch (error: unknown) {
			return HTMLType.getError(error);
		}
	}
}
