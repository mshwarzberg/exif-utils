import { type ExifUtil, execAsync, execSync } from '../../exif-utils';
import { XMLType } from '../../core/abstract';
import { ProcessOutput } from '../../core/interfaces';
import { DataType } from '../../core/types';
import MetadataReader from '../metadata-reader';

export default class XMLReader extends MetadataReader {
	constructor(exifUtil: ExifUtil) {
		super(exifUtil, DataType.XML);
	}

	/**
     * @override {@link ExecutableCommand.executeAsync}
     * @returns A {@link Promise} that resolves with a stringified xml table of the exif data or one with an error message
     */
	async executeAsync(): Promise<string> {
		try {
			const result: ProcessOutput = await execAsync(this.getCMD());
			return result.stdout;
		} catch (error: unknown) {
			return XMLType.getError(error);
		}
	}

	/**
     * @override {@link ExecutableCommand.executeSync}
     * @returns A stringified xml table of the exif data or one with an error message
     */
	executeSync(): string {
		try {
			const result: string = execSync(this.getCMD()).toString();
			return result;
		} catch (error: unknown) {
			return XMLType.getError(error);
		}
	}
}
