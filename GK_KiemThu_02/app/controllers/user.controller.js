const User = require("../models/user.model");

// [Get - localhost:5000/api/user]
const GetAllUser = async (req, res) => {
  try {
    let user = await User.find();
    if (user.length === 0) {
      res.json({ success: true, msg: "Hiện tại chưa có User nào", user });
    } else {
      res.json({ success: true, msg: "Get Thành công tất cả Users", user });
    }
  } catch (err) {
    console.log(err);
  }
};

// [Post - localhost:5000/api/user]

const PostUser = async (req, res) => {
  const { avatar, username, email, password, phone, sex, address } = req.body;
  if (
    !avatar ||
    !username ||
    !email ||
    !password ||
    !phone ||
    !sex ||
    !address
  ) {
    res.json({
      msg: "Vui lòng nhập đầy đủ thông tin",
    });
  } else {
    let user = new User({
      avatar: req.body.avatar,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      sex: req.body.sex,
      address: req.body.address,
    });
    // Save user
    await user.save();
    res.status(201).json({ msg: "Thêm thành công User", user });
  }
};

// [Post - localhost:5000/api/user/:id]
const UpdateOnlyUser = async (req, res) => {
  try {
    const results = await User.findById(req.params.id);
    if (results.userId === req.body.userId) {
      await results.updateOne({
        $set: {
          avatar: req.body.avatar,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          phone: req.body.phone,
          sex: req.body.sex,
          address: req.body.address,
        },
      });
      res.json({ success: true, message: "Update User successfully", results });
    } else {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "There're something wrong!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// [Delete - localhost:5000/api/user/:id]

const DeleteUser = async (req, res) => {
  try {
    const delUser = await User.findById(req.params.id);
    if (!delUser) {
      res.status(500).json({ success: false, message: "Id Không Tồn Tại" });
    } else {
      await delUser.deleteOne();
      res.json({
        success: true,
        message: "Delete successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error Server" });
  }
};

// [Get - localhost:5000/api/user/:id]

const GetByIdUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(500).json({
        success: false,
        msg: "Id không tồn tại ",
        data: {},
      });
    }
    const user = await User.findById(id);
    return res.status(200).json({ success: true, user });
  } catch (e) {
    console.log("create error:", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

// [Post - localhost:5000/api/user/login]
const LoginUser = async (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({
    username: username,
    password: password,
  })
    .then((data) => {
      if (data) {
        res.json({
          success: true,
          message: "Dang Nhap Thanh Cong",
        });
      } else {
        res.json({
          success: false,
          message: "Dang Nhap Khong Thanh Cong",
        });
      }
    })
    .catch((err) => {
      res.json({
        success: false,
        message: "Loi Server",
        err,
      });
    });
};

module.exports = {
  PostUser,
  GetAllUser,
  UpdateOnlyUser,
  DeleteUser,
  LoginUser,
  GetByIdUser,
};
