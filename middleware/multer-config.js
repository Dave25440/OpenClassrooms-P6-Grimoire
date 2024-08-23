const multer = require("multer");
const path = require("path");
const sharp = require("sharp");

const storage = multer.memoryStorage();

exports.upload = multer({ storage }).single("image");

exports.convert = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const destination = path.join(__dirname, "../images");
  const fileName =
    req.file.originalname
      .split(" ")
      .join("_")
      .split(".")
      .slice(0, -1)
      .join(".") +
    Date.now() +
    ".webp";

  try {
    await sharp(req.file.buffer)
      .resize(463)
      .webp({ quality: 75 })
      .toFile(destination + fileName);

    req.file.filename = fileName;
    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};
