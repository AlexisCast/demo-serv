const { promisify } = require('util');
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

exports.protect = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    // 1) Get token and check of it is there
    let token;

    if (authorization && authorization.startsWith('Bearer ')) {
      token = authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        msg: 'You are not logged in! Please log in to get access.',
      });
    }
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const freshUser = await User.findById(decoded.id);

    if (!freshUser) {
      return res.status(401).json({
        msg: 'The user belonging to this token does no logner exist.',
      });
    }

    // 4) Check if user changed password after the token was issued
    if (freshUser.changesPasswordAfter(decoded.iat)) {
      return res.status(401).json({
        msg: 'User recently changed password! Please log in again.',
      });
    }

    // 5) Grant access to protected route
    req.user = freshUser;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(403).send({
        msg: 'Token has expired',
      });
    }

    res.status(401).send({
      msg: 'Token not valid',
    });
  }
};
