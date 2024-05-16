const cloudinary = require('cloudinary').v2;
const { response } = require('../app');
const Product = require('../models/productModel');

cloudinary.config(process.env.CLOUDINARY_URL);

exports.updateImageCloudinary = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { file } = req;
    const collection = 'products';
    console.log({ file });

    // 2) validate that we have file
    if (!file) {
      return res.status(500).json({
        message: 'File is required.',
      });
    }

    const model = await Product.findById(id);
    if (model.img) {
      const nameArr = model.img.split('/');
      const name = nameArr[nameArr.length - 1];
      const [public_id] = name.split('.');

      await cloudinary.uploader.destroy(
        `${process.env.CLOUDINARY_FOLDER}/${collection}/${public_id}`,
      );
    }

    const arrImgTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    const isImgType = arrImgTypes.includes(file.mimetype);

    console.log({ isImgType });

    if (!isImgType) {
      return res.status(400).json({
        status: 'fail',
        msg: `${file.originalname} is not an Image`,
      });
    }
    console.log('UP');

    const b64 = Buffer.from(file.buffer).toString('base64');
    const dataURI = `data:${file.mimetype};base64,${b64}`;

    const resp = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'auto',
      folder: `${process.env.CLOUDINARY_FOLDER}/${collection}`,
      transformation: [
        {
          width: 250,
          height: 250,
          crop: 'limit',
          gravity: 'center',
          // effect: "art:hokusai",
        },
      ],
    });

    console.log(await response);

    const { secure_url } = resp;

    model.img = secure_url;

    await model.save();

    return res.json({
      status: 'success',
      data: { product: model },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      msg: 'Error in Upload',
    });
  }
};
