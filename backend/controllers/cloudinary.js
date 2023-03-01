const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.createImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: Date.now(),
      resource_type: "auto",
    });

    res.send(result);
  } catch (err) {
    res.status(500).send("Upload Error!!!");
  }
};

exports.removeImage = async (req, res) => {
  try {
    // Code
    let images_id = req.body.public_id
    await cloudinary.uploader.destroy(images_id, (result) => {
      res.send(result);
    });

  } catch (err) {
    res.status(500).send("Server Error!/delete images error");
  }
};