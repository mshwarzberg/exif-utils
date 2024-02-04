import { ExifUtil } from '../../exif-utils';
import { DataType } from '../../core/types';
import InfoReader from '../info-reader';

export default class InfoJSON extends InfoReader {

	constructor(exifUtil: ExifUtil) {
		super(exifUtil, DataType.JSON);
	}

	/**
	 * @returns a list of all tags supported by exiftool.
	 * 			There are other tags not officially supported
	 */
	public listAllTagsSync(): Array<string> {
		this.command = `"${ExifUtil.getExiftoolPath()}" -q -list`;
		return this.executeSync().trim()
			.split(/\s+/);
	}

	/**
	 * @returns a list of file extensions supported by exiftool
	 */
	public listFileTypesSync(): Array<string> {
		this.command = `"${ExifUtil.getExiftoolPath()}" -q -listf`;
		return this.executeSync().trim()
			.split(/\s+/);
	}

	/**
	 * @returns a list of file extensions that support writing to.
	 */
	public listWritableFileTypesSync(): Array<string> {
		this.command = `"${ExifUtil.getExiftoolPath()}" -q -listwf`;
		return this.executeSync().trim()
			.split(/\s+/);
	}

	/**
	 * @returns a list of metadata tag groups that are deletable.
	 */
	public listDeletableGroups(): Array<string> {
		this.command = `"${ExifUtil.getExiftoolPath()}" -q -listd`;
		return this.executeSync().trim()
			.split(/\s+/);
	}
}
