const User = require('../models/userModel');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    // results: totalProtducts,
    shown: users.length,
    requestedAt: req.requestTime,
    data: {
      users: users,
    },
  });
};

exports.updateMe = async (req, res, next) => {
  // 1) create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return res.status(400).json({
      msg: 'This route is not for password updates. Please use /updateMyPassword',
    });
  }

  // 3) filtered out unwanted fields names that are not allowed to be updated
  // const filteredBody = filterObj(req.body, 'name', 'email');
  const filteredBody = filterObj(req.body, 'name');

  // 3) update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    data: {
      user: updatedUser,
    },
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    msg: 'This route is not yet defined',
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    msg: 'This route is not yet defined',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    msg: 'This route is not yet defined',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    msg: 'This route is not yet defined',
  });
};
