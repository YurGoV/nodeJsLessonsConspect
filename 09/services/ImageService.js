const fse = require('fs-extra');
const path = require('path');
const sharp = require('sharp');
const multer = require('multer');
const { v4: uuid } = require('uuid');

const CustomError = require('../utils');

const { WORK_DIR } = process.env;

class ImageService {
  static upload(name) {
    const multerStorage = multer.memoryStorage();

    const multerFileFilter = (req, file, clb) => {
      if (file.mimetype.startsWith('image')) {
        clb(null, true);
      } else {
        clb(new CustomError(400, 'Please upload image file only'), false);
      }
    };

    return multer({
      storage: multerStorage,
      fileFilter: multerFileFilter,
    }).single(name);
  }

  static async save(file, options, ...pathSegments) {
    const fileName = `${uuid()}.jpeg`;
    const fullFilePath = path.join(
      process.cwd(),
      WORK_DIR,
      'static',
      ...pathSegments
    );

    await fse.ensureDir(fullFilePath);

    await sharp(file.buffer)
      .resize(options || { height: 500, width: 500 })
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(path.join(fullFilePath, fileName));

    return path.join(...pathSegments, fileName);
  }
}

module.exports = ImageService;
