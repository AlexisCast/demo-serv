const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.warn(error);
    res.status(400).json({
      msg: 'Invalid data sent!',
      err: error,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // 1) check if email and password exist
  if (!email || !password) {
    return res.status(400).json({
      msg: 'Provide email and password',
    });
  }

  // 2) check if user exist && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({
      msg: `incorrect password or email`,
    });
  }

  const isCorrect = await user.correctPassword(password, user.password);

  if (!isCorrect) {
    return res.status(401).json({
      msg: `incorrect password or email`,
    });
  }

  // 3) if everything ok, send token to client
  const token = signToken(user._id);

  res.status(200).json({
    token,
    user: { name: user.name },
  });
};
