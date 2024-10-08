const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const storage = multer.memoryStorage();

exports.upload = multer({ storage }).single("image");

exports.convert = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const fileType = req.file.mimetype;

  if (!fileType.startsWith("image/")) {
    return res.status(400).json({ message: "Fichier image attendu" });
  }

  const destination = path.join(__dirname, "../images");

  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const fileName =
    req.file.originalname
      .split(" ")
      .join("_")
      .split(".")
      .slice(0, -1)
      .join(".") +
    Date.now() +
    ".webp";
  const filePath = path.join(destination, fileName);

  try {
    await sharp(req.file.buffer)
      .resize(442, 568)
      .webp({ quality: 75 })
      .toFile(filePath);

    req.file.filename = fileName;
    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};
