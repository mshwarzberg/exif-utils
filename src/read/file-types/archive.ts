import FilePropertyBuilder from './file';

/**
 * This class is for all archival type files (zip, tar, rar, gz, ...)
 * There are no guarantees that the property exists for a given file.
 * For example a tar file won't have zip properties.
 */
export default class ArchivePropertyBuilder extends FilePropertyBuilder {
	public withZoneIdentifier(): this {
		this.withProperties('ZoneIdentifier');
		return this;
	}

	public withZipRequiredVersion(): this {
		this.withProperties('ZipRequiredVersion');
		return this;
	}

	public withZipBitFlag(): this {
		this.withProperties('ZipBitFlag');
		return this;
	}

	public withZipCompression(): this {
		this.withProperties('ZipCompression');
		return this;
	}

	public withZipModifyDate(): this {
		this.withProperties('ZipModifyDate');
		return this;
	}

	public withZipCRC(): this {
		this.withProperties('ZipCRC');
		return this;
	}

	public withZipCompressedSize(): this {
		this.withProperties('ZipCompressedSize');
		return this;
	}

	public withZipUncompressedSize(): this {
		this.withProperties('ZipUncompressedSize');
		return this;
	}

	public withZipFileName(): this {
		this.withProperties('ZipFileName');
		return this;
	}

	public withCompression(): this {
		this.withProperties('Compression');
		return this;
	}

	public withFlags(): this {
		this.withProperties('Flags');
		return this;
	}

	public withModifyDate(): this {
		this.withProperties('ModifyDate');
		return this;
	}

	public withExtraFlags(): this {
		this.withProperties('ExtraFlags');
		return this;
	}

	public withOperatingSystem(): this {
		this.withProperties('OperatingSystem');
		return this;
	}

	public withArchivedFileName(): this {
		this.withProperties('ArchivedFileName');
		return this;
	}

	public withFileVersion(): this {
		this.withProperties('FileVersion');
		return this;
	}

	public withCompressedSize(): this {
		this.withProperties('CompressedSize');
		return this;
	}

	public withUncompressedSize(): this {
		this.withProperties('UncompressedSize');
		return this;
	}
}
