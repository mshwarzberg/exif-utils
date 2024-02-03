import CSVReader from './read/data-types/csv';
import DefaultReader from './read/data-types/default';
import HTMLReader from './read/data-types/html';
import JSONReader from './read/data-types/json';
import path from 'path';
import os from 'os';
import util from 'util';
import child_process, { execSync } from 'child_process';

import Converter from './convert/converter';
import XMLReader from './read/data-types/xml';

export const execAsync = util.promisify(child_process.exec);
export { execSync };

/**
 * A (hopefully) temporary function that validates whether the current OS is windows
 * (windows is the only OS currently supported)
 */
function validateOS() {
	const supportedOS = ['win32'];

	if (!supportedOS.includes(os.platform())) {
		throw new Error('Your OS isn\'t supported');
	}
}

validateOS();

/**
 * This is intended to only be called once.
 * There is functionality to update the necessary properties to scan different locations,
 * or to change the output format, etc.
 */
export class ExifUtil {
	/**
   * If any one of the paths are invalid, extraction of metadata will fail.
   */
	private paths: string[];

	/**
   * The absolute path representation of exiftool location.
   */
	static exifToolPath: string = path.join(
		__dirname,
		'../resources/exiftool.exe',
	);

	/**
   * @note paths can be overridden by using {@link setPaths}
   * @param paths any number of files or folders to be read
   */
	constructor(...paths: string[]) {
		this.paths = paths;
	}

	/**
   * @returns a new instance of {@link JSONReader}
   */
	public jsonReader(): JSONReader {
		return new JSONReader(this);
	}

	/**
   * @returns a new instance of {@link CSVReader}
   */
	public csvReader(): CSVReader {
		return new CSVReader(this);
	}

	/**
   * @returns a new instance of {@link HTMLReader}
   */
	public htmlReader(): HTMLReader {
		return new HTMLReader(this);
	}

	/**
   * @returns a new instance of {@link DefaultReader}
   */
	public defaultReader(): DefaultReader {
		return new DefaultReader(this);
	}

	/**
   * @returns a new instance of {@link XMLReader}
   */
	public xmlReader(): XMLReader {
		return new XMLReader(this);
	}

	/**
   * This will update the {@link paths} of the instance of {@link ExifUtil}
   * This is more preferable than creating a new instance entirely in the case of updating the paths.
   * @param paths a list of paths that are to be scanned.
   */
	public setPaths(...paths: string[]): void {
		this.paths = paths;
	}

	/**
   * @returns {string[]} The array of files/folders {@link paths} to extract metadata from.
   */
	public getPaths(): string[] {
		return this.paths;
	}
}

export { Converter };
