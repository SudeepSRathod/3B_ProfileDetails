const express = require("express");
const router = express.Router();
const { register, login, profile } = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", auth, profile);

module.exports = router;
