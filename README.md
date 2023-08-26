```markdown
# ExifUtil Node

ExifUtil Node is a Node.js library that provides a convenient interface for working with Exif metadata in files. It allows you to extract, modify, and manipulate Exif data in various file formats, including images and multimedia files.

**Note**: Currently, ExifUtil Node is supported on Windows only.

## Installation

You can install exif-utils in Node using npm:

```bash
npm install exif-utils
```

## Usage

### Importing the library

```javascript
const ExifUtil = require('exif-utils');
```

### Initialize ExifUtil

```javascript
const exifUtil = new ExifUtil();
```

### Extract Exif Metadata

```javascript
const json = exifUtil.readMetadata();
```

# Test

To test, run "npm run build" then run "npm test"

## License

This project is licensed under the [MIT License](https://mit-license.org/).
```
