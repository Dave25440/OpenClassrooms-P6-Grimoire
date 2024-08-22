const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const bookCtrl = require("../controllers/book");

router.post("/", auth, bookCtrl.createBook);
router.put("/:id", auth, bookCtrl.modifyBook);
router.delete("/:id", auth, bookCtrl.deleteBook);
router.get("/:id", bookCtrl.getOneBook);
router.get("/", bookCtrl.getAllBooks);

module.exports = router;
