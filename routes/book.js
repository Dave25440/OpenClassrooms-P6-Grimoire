const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const bookCtrl = require("../controllers/book");

router.post("/", auth, multer.upload, multer.convert, bookCtrl.createBook);
router.post("/:id/rating", auth, bookCtrl.rateBook);
router.get("/", bookCtrl.getAllBooks);
router.get("/bestrating", bookCtrl.getBestBooks);
router.get("/:id", bookCtrl.getOneBook);
router.put("/:id", auth, multer.upload, multer.convert, bookCtrl.modifyBook);
router.delete("/:id", auth, bookCtrl.deleteBook);

module.exports = router;
