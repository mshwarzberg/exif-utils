/**
 * Enum representing the supported outputs by Exiftool.
 * @enum {string}
 *
 * @property JSON - Represents JSON data format ("j"). Use this as an argument when interacting with Exiftool to specify JSON data type.
 * @property HTML - Represents HTML data format ("h"). Use this as an argument when interacting with Exiftool to specify HTML data type.
 * @property CSV - Represents CSV data format ("csv"). Use this as an argument when interacting with Exiftool to specify CSV data type.
 * @property XML - Represents XML data format ("x"). Use this as an argument when interacting with Exiftool to specify XML data type.
 * @property PHP - Represents PHP data format ("php"). Use this as an argument when interacting with Exiftool to specify PHP data type.
 * @property TSV - Represents TSV (Tab-Separated Values) data format ("t"). Use this as an argument when interacting with Exiftool to specify TSV data type.
 */
export enum DataType {
    DEFAULT = '',
    JSON = '-j',
    HTML = '-h',
    CSV = '-csv',
    XML = '-X',
    // These two are currently not supported
    PHP = '-php',
    TSV = '-t',
}

export enum FileType {
    IMAGE,
    ARCHIVE,
    DOCUMENT,
    VIDEO,
    DEFAULT,
}

/**
 * DO NOT USE FOR ANYTHING OTHER THAN CATCH BLOCKS.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Err = any;
