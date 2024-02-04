import { ExifUtil } from '../exif-utils';
import { ExecutableCommand } from '../core/abstract';

/**
 * The `Writer` class serves as the class used to write metadata
 */
export default class Writer extends ExecutableCommand  {
	readonly exifUtil: ExifUtil;
	private recursively: string = '';
	private backup: string = '';

	constructor(exifUtil: ExifUtil) {
		super();
		this.exifUtil = exifUtil;
	}

	async executeAsync(): Promise<Array<Record<string, unknown>> | string> {
		return await '';
	}

	executeSync(): Array<Record<string, unknown>> |string {
		return '';
	}

	public clearAllProperties(): void {

	}

	public withoutBackup(): Writer {
		this.backup = '--overwrite-original';
		return this;
	}

	public withBackup(): Writer {
		this.backup = '';
		return this;
	}

	public withRecursion(): Writer {
		this.recursively = '-r';
		return this;
	}

	public withoutRecursion(): Writer {
		this.recursively = '';
		return this;
	}
}
