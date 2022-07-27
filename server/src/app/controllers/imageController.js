const fs = require('fs');
const imageModel = require('../../models/product/imageModel.js');

//trả về arr id đã tạo
exports.createImages = async (req) => {
  let imagesId = [];
  for (const file of req.files) {
    const ext = file.mimetype.split('/')[1];
    const img = {
      name: file.filename,
      img: {
        data: fs.readFileSync(file.path).toString('base64'),
        contentType: ext,
      },
    };
    fs.unlinkSync(file.path);

    try {
      const resultImg = await imageModel.create(img);
      imagesId.push(resultImg._id);
    } catch (error) {
      console.error(
        'ERROR -------------- exports.createImages:[CREATE IMAGES] ',
        error
      );
    }
  }
  return imagesId;
};
