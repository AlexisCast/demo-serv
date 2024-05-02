const User = require('../models/userModel');

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
