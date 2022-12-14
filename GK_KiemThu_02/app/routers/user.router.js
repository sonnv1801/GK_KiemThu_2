const express = require("express");
const router = express.Router();

const {
  GetAllUser,
  PostUser,
  UpdateOnlyUser,
  DeleteUser,
  LoginUser,
  GetByIdUser,
} = require("../controllers/user.controller");
router.post("/", PostUser);
router.get("/", GetAllUser);
router.put("/:id", UpdateOnlyUser);
router.delete("/:id", DeleteUser);
router.post("/login", LoginUser);
router.get("/:id", GetByIdUser);
module.exports = router;
