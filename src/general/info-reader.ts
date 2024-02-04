import { ExifUtil, execAsync, execSync } from '../exif-utils';
import { DefaultType, Reader } from '../core/abstract';
import { DataType } from '../core/types';

export default abstract class InfoReader extends Reader {

	constructor(exifUtil: ExifUtil, dataType: DataType) {
		super(exifUtil, dataType);
	}

	protected async executeAsync(): Promise<string> {
		try {
			const result = await execAsync(this.getCMD());
			return result.stdout;
		} catch (error: unknown) {
			return DefaultType.getError(error);
		}
	}

	protected executeSync(): string  {
		try {
			const result: string = String(execSync(this.getCMD()));
			return result;
		} catch (error: unknown) {
			return DefaultType.getError(error);
		}
	}

	// abstract listAllTagsSync(): Array<string> | string;

	// abstract listFileTypesSync(): Array<string> | string;

	// abstract listWritableFilesSync(): Array<string> | string;

	// abstract listPrintableTagsSync(): Array<string> | string;
}
