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
  try {
    // // Upload image to cloudinary
    // const result = await cloudinary.uploader.upload(req.file.path);

    // Create new user
    let user = new User({
      avatr: req.body.avatr,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      sex: req.body.sex,
      address: req.body.address,
    });
    // Save user
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  PostUser,
  GetAllUser,
};
