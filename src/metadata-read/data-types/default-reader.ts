import { type ExifUtil, execAsync, execSync } from '../../exif-utils';
import { DataType } from '../../core/types';
import { ProcessOutput } from '../../core/interfaces';
import MetadataReader from '../metadata-reader';
import { DefaultType } from '../../core/abstract';

/**
 * @alert This class will not return the file path (SourceFile) in the output unless explicitly selected.
 */
export default class DefaultReader extends MetadataReader {
	constructor(exifUtil: ExifUtil) {
		super(exifUtil, DataType.DEFAULT);
	}

	/**
     * @override {@link ExecutableCommand.executeAsync}
     * @returns A {@link Promise} that resolves with a simple string representation of the exif data or one with an error message
     */
	async executeAsync(): Promise<string> {
		try {
			const result: ProcessOutput = await execAsync(this.getCMD());
			return result.stdout;
		} catch (error: unknown) {
			return DefaultType.getError(error);
		}
	}

	/**
     * @override {@link ExecutableCommand.executeSync}
     * @returns A simple string representation of the exif data or one with an error message
     */
	executeSync(): string {
		try {
			const result: string = execSync(this.getCMD()).toString();
			return result;
		} catch (error: unknown) {
			return DefaultType.getError(error);
		}
	}
}
