import { ExifUtil } from '../exif-utils';
import { DataType, Err } from './types';

export abstract class ExecutableCommand {
	protected command!: string;

	protected abstract executeAsync(): Promise<Array<Record<string, unknown>> | string>;
	protected abstract executeSync(): Array<Record<string, unknown>> | string;

	protected getCMD(): string {
		return this.command;
	}
}

export abstract class XMLType {
	static getError(error: Err): string {
		return `<error><message>${error.message}</message><stack>${error.stack}</stack></error>`;
	}
}

export abstract class JSONType {
	static getError(error: Err): Array<Record<string, unknown>> {
		return [{ error: error.message, stack:  error.stack }];
	}
}

export abstract class HTMLType {
	static getError(error: Err): string {
		return `<!-- Error --><table><tr><td>message</td><td>${error.message}</td></tr><<tr></tr><td>stack</td><td>${error.stack}</td></table>`;
	}
}

export abstract class DefaultType {
	static getError(error: Err): string {
		return `error: ${error.message}\r\nstack: ${error.stack}`;
	}
}

export abstract class CSVType {
	static getError(error: Err): string {
		return `Error,Stack\r\n${error.message},${error.stack}`;
	}
}

export abstract class Reader extends ExecutableCommand {
	protected readonly exifUtil: ExifUtil;
	protected readonly dataType: DataType;

	constructor(exifUtil: ExifUtil, dataType: DataType) {
		super();
		this.exifUtil = exifUtil;
		this.dataType = dataType;
	}
}
