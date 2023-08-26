```markdown
# ExifUtil Node

ExifUtil is a Node.js library that provides a convenient interface for working with Exif metadata in files. It allows you to extract, modify, and manipulate Exif data in various file formats, including images and multimedia files.

**Note**: Currently, ExifUtil Node is supported on Windows only.

## Installation

You can install exif-utils in Node using npm: npm install exif-utils

## Usage

```javascript
const { ExifUtil } = require('exif-utils');
const exifUtil = new ExifUtil("/path/to/your/file");
```

### Extract Exif Metadata

```javascript
const json = await exifUtil.readMetadata() // exifUtil.readMetadataSync();
// do something with the json
```

# Test

To test, run "npm run build" then run "npm test"

## License

This project is licensed under the [MIT License](https://mit-license.org/).
```
