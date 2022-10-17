const express = require("express");
const router = express.Router();

const {
  GetAllUser,
  PostUser,
  UpdateOnlyUser,
  DeleteUser,
  LoginUser,
} = require("../controllers/user.controller");
router.post("/", PostUser);
router.get("/", GetAllUser);
router.put("/:id", UpdateOnlyUser);
router.delete("/:id", DeleteUser);
router.post("/login", LoginUser);
module.exports = router;
