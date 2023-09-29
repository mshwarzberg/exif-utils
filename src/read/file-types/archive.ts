import FilePropertyBuilder from "./file";

/**
 * This class is for all archival type files (zip, tar, rar, gz, ...)
 * There are no guarantees that the property exists for a given file.
 * For example a tar file won't have zip properties.
 */
export default class ArchivePropertyBuilder extends FilePropertyBuilder {

    public withZoneIdentifier(): ArchivePropertyBuilder {
        this.withProperties("ZoneIdentifier");
        return this;
    }
    
    public withZipRequiredVersion(): ArchivePropertyBuilder {
        this.withProperties("ZipRequiredVersion");
        return this;
    }
    
    public withZipBitFlag(): ArchivePropertyBuilder {
        this.withProperties("ZipBitFlag");
        return this;
    }
    
    public withZipCompression(): ArchivePropertyBuilder {
        this.withProperties("ZipCompression");
        return this;
    }
    
    public withZipModifyDate(): ArchivePropertyBuilder {
        this.withProperties("ZipModifyDate");
        return this;
    }
    
    public withZipCRC(): ArchivePropertyBuilder {
        this.withProperties("ZipCRC");
        return this;
    }
    
    public withZipCompressedSize(): ArchivePropertyBuilder {
        this.withProperties("ZipCompressedSize");
        return this;
    }
    
    public withZipUncompressedSize(): ArchivePropertyBuilder {
        this.withProperties("ZipUncompressedSize");
        return this;
    }
    
    public withZipFileName(): ArchivePropertyBuilder {
        this.withProperties("ZipFileName");
        return this;
    }
    
    public withCompression(): ArchivePropertyBuilder {
        this.withProperties("Compression");
        return this;
    }
    
    public withFlags(): ArchivePropertyBuilder {
        this.withProperties("Flags");
        return this;
    }
    
    public withModifyDate(): ArchivePropertyBuilder {
        this.withProperties("ModifyDate");
        return this;
    }
    
    public withExtraFlags(): ArchivePropertyBuilder {
        this.withProperties("ExtraFlags");
        return this;
    }
    
    public withOperatingSystem(): ArchivePropertyBuilder {
        this.withProperties("OperatingSystem");
        return this;
    }
    
    public withArchivedFileName(): ArchivePropertyBuilder {
        this.withProperties("ArchivedFileName");
        return this;
    }
    
    public withFileVersion(): ArchivePropertyBuilder {
        this.withProperties("FileVersion");
        return this;
    }
    
    public withCompressedSize(): ArchivePropertyBuilder {
        this.withProperties("CompressedSize");
        return this;
    }
    
    public withUncompressedSize(): ArchivePropertyBuilder {
        this.withProperties("UncompressedSize");
        return this;
    }
    
}