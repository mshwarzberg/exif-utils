
# ExifTool Node

ExifTool Node is a Node.js library that provides a convenient interface for working with Exif metadata in files. It allows you to extract, modify, and manipulate Exif data in various file formats, including images and multimedia files.

## Installation

You can install exif-utils in Node using npm:

```bash
npm install exif-utils
```

## Usage

### Importing the library

```javascript
const ExifTool = require('exif-utils');
```

### Initialize ExifTool

```javascript
const exiftool = new ExifTool();
```

### Extract Exif Metadata

```javascript
exiftool.extractMetadata('path/to/your/file.jpg')
  .then(metadata => {
    console.log(metadata);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

# Test

To test run "npm run build" then run "npm test"

## License

This project is licensed under the [MIT License](https://mit-license.org/).
```
