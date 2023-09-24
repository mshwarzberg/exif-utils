# ExifUtil Node

**ExifUtil** is a powerful Node.js library designed for seamless handling of Exif metadata within various file formats, including images and multimedia files. It provides a convenient interface for tasks such as extracting, modifying, and manipulating Exif data.

## Source

You can find the source code for ExifUtil on GitHub: [GitHub Repository](https://github.com/mshwarzberg/exif-utils)

Please note that as of now, ExifUtil is compatible with the Windows operating system only.

## Installation

You can easily install ExifUtil in your Node.js project using npm:

```bash
npm install exif-utils
```

## Example Usage

Here's an example of how to use ExifUtil in your Node.js application:

```javascript
import { ExifUtils } from "exif-utils";

// Alternatively, using require:
// const { ExifUtils } = require("exif-utils");

const exifUtil = new ExifUtils("path/to/your/file");
const JSONReader = exifUtil.jsonReader();
const json = JSONReader.readSync(); // or JSONReader.readAsync();
// Perform operations with the extracted JSON data
```

## Testing

To run tests for ExifUtil, use the following command:

```bash
npm test
```

## License

This project is licensed under the [MIT License](https://mit-license.org/).