const mongoose = require('mongoose');
const validator = require('validator');

const ownerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'The name is required'],
    },
    lastName: {
      type: String,
      required: [true, 'The lastName is required'],
    },
    phoneNumber1: {
      type: String,
      unique: true,
      required: [true, 'The phoneNumber1 is required'],
    },
    typePhone1: {
      type: String,
      enum: {
        values: ['mobile', 'home'],
        message: 'type phoneNumber1 is either: mobile, home',
      },
      default: 'mobile',
      required: [true, 'The typePhone1 is required'],
    },
    phoneNumber2: {
      type: String,
    },
    typePhone2: {
      type: String,
      enum: {
        values: ['mobile', 'home'],
        message: 'type phoneNumber2 is either: mobile, home',
      },
      default: 'mobile',
    },
    address: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'The email is required'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    other: {
      type: String,
    },
    state: {
      type: Boolean,
      default: true,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ['toDelete', 'archived', 'exist'],
        message: 'status is either: toDelete, archived, exist',
      },
      default: 'exist',
    },
    UpdatedBy: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;
