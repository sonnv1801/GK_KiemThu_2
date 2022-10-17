const express = require("express");
const router = express.Router();

const { GetAllUser, PostUser } = require("../controllers/user.controller");
router.post("/", PostUser);
router.get("/", GetAllUser);
module.exports = router;
