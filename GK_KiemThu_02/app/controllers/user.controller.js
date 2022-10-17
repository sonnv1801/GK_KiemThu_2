const User = require("../models/user.model");

const GetAllUser = async (req, res) => {
  try {
    let user = await User.find();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

//quang phương thức post

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
      message: "Nhap Day Du Di Ban",
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
    res.json({ msg: "Them Thanh Cong", user });
  }
};

// [Put - Update Users]
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
      res.json({ success: true, message: "Update User successfully" });
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

// [Delete - Delete Users]

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
};
