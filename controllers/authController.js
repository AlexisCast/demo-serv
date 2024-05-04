const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const sendEmail = require('../utils/email');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm,
    });

    createSendToken(newUser, 201, res);
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
  createSendToken(user, 200, res);
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

// eslint-disable-next-line arrow-body-style
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    //roles is an a array
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        msg: 'You do not have permission to perform this action',
      });
    }

    next();
  };
};

exports.forgotPassword = async (req, res, next) => {
  try {
    // 1) get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        msg: 'There is no user with email address.',
      });
    }
    // 2) generate the random reset token
    const resetToken = user.createPasswordResetToken();

    await user.save({ validateBeforeSave: false });

    // res.status(200).json({
    //   msg: `Email has been sent to ${req.body.email}`,
    // });

    // 3) send it to user's email
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordCorfirm to: ${resetURL}.\nIf you did'nt forget your password, please ignore this email.`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Your password reset token (valid for 10min)',
        message,
      });

      res.status(200).json({
        msg: `Token has been sent to ${req.body.email}`,
      });
    } catch (error) {
      console.warn(error);
      res.status(400).json({
        msg: 'Could not send email via host selected.',
        err: error,
      });
    }
  } catch (error) {
    console.warn(error);
    res.status(400).json({
      msg: 'Could not send email.',
      err: error,
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    // 1) get user based on the token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // 2) if token has not expired, and there is user, set the new password
    if (!user) {
      return res.status(400).json({
        msg: 'Token is invalid or has expired.',
      });
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();
    // 3) update changedPasswordAt property for the user

    // 4) log the user in, send JWT
    createSendToken(user, 200, res);
  } catch (error) {
    console.warn(error);
    res.status(400).json({
      msg: 'Invalid data sent!',
      err: error,
    });
  }
};

exports.updatedPassword = async (req, res, next) => {
  try {
    const { currentPassword, password, passwordConfirm } = req.body;
    const { _id } = req.user;
    // 1) get user from collection
    const user = await User.findById(_id).select('+password');

    if (!user) {
      return res.status(401).json({
        msg: `user does not exist`,
      });
    }

    // 2) check if POSTed current password is correct
    const isCorrect = await user.correctPassword(
      currentPassword,
      user.password,
    );

    if (!isCorrect) {
      return res.status(401).json({
        msg: `incorrect current password`,
      });
    }

    // 3) if so, update the password
    user.password = password;
    user.passwordConfirm = passwordConfirm;

    const newUser = await user.save();
    //NOT to use User.findByIdAndUpdate, is to use modal validators and pre save middlewares

    //4) log user, send JWT
    createSendToken(newUser, 200, res);
  } catch (error) {
    console.warn(error);
    res.status(400).json({
      msg: 'Could not update password.',
      err: error,
    });
  }
};
