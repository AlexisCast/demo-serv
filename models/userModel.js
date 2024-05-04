const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'The name is required'],
    },
    email: {
      type: String,
      required: [true, 'The email is required'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    photo: {
      type: String,
    },
    role: {
      type: String,
      enum: {
        values: ['guest', 'user', 'admin'],
        message: 'role is either: guest, user, admin',
      },
      default: 'guest',
    },
    password: {
      type: String,
      required: [true, 'The password is required'],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Confirm password is required'],
      validate: {
        // this only works on CREATE & SAVE!!
        validator: function (el) {
          return el === this.password;
        },
        message: 'Password and passwordConfirm are not the same',
      },
    },
    passwordChangedAt: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // hash the password with cost of 12
  this.password = await bcryptjs.hash(this.password, 12);

  // delete passwordConfirm field
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;

  next();
});

// to remove password
userSchema.post('save', (doc, next) => {
  console.log('remove password');
  doc.password = undefined;

  next();
});

userSchema.methods.correctPassword = async function (
  canditePassword,
  userPassword,
) {
  return await bcryptjs.compareSync(canditePassword, userPassword);
};

userSchema.methods.changesPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    // console.log(changedTimestamp, JWTTimestamp);
    // console.log(JWTTimestamp < changedTimestamp);
    return JWTTimestamp < changedTimestamp;
  }

  // false means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  //10 minutes
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  //resetToken should match on email
  console.log({ resetToken }, this.passwordResetExpires);

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
