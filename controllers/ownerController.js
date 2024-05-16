const Owner = require('../models/ownerModel');
const {
  filterFunct,
  sortFunct,
  fieldsFunct,
  paginationFunct,
} = require('../utils/apiFeatures');

exports.getAllOwners = async (req, res) => {
  const {
    page = 1,
    limit = 15,
    fields = '-__v',
    sort = '-createdAt',
    ...objQuery
  } = req.query;
  try {
    // 1) Filter
    let query = filterFunct(Owner, objQuery);

    // 2)Sort
    query = sortFunct(query, sort);

    // 3) Fields
    query = fieldsFunct(query, fields);

    // 4) Pagination
    let totalOwners;
    if (page) {
      totalOwners = await Owner.countDocuments(query);
    }

    query = paginationFunct(Owner, query, page, limit);

    // 5) Execution
    const owners = await query;

    res.status(200).json({
      status: 'success',
      results: totalOwners,
      shown: owners.length,
      requestedAt: req.requestTime,
      data: {
        owners: owners,
      },
    });
  } catch (error) {
    res.status(404).json({
      msg: error.message ? error.message : 'Not able to get owners',
      err: error,
    });
  }
};

exports.getOwner = async (req, res) => {
  try {
    const { id } = req.params;

    const owner = await Owner.findById(id);

    if (!owner) {
      return res.status(404).json({
        msg: 'Owner not found!',
      });
    }

    res.status(200).json({
      data: {
        owner: owner,
      },
    });
  } catch (error) {
    res.status(404).json({
      msg: 'Not able to get owner.',
      err: error,
    });
  }
};

exports.createOwner = async (req, res) => {
  try {
    // const newOwner=new Owner(req.body);
    // newOwner.save()

    const newOwner = await Owner.create(req.body);

    res.status(201).json({
      data: {
        owner: newOwner,
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

exports.updateOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const { ...data } = req.body;

    const updatedOwner = await Owner.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      data: {
        owner: updatedOwner,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: 'Not able to update!',
      err: error,
    });
  }
};

exports.deleteOwner = async (req, res) => {
  try {
    const { id } = req.params;

    //Delete physically
    // const deletedOwner = await Owner.findByIdAndDelete(id, {
    //   new: true,
    // });

    const deletedOwner = await Owner.findByIdAndUpdate(
      id,
      { status: 'toDelete' },
      { new: true },
    );

    res.status(200).json({
      data: {
        owner: deletedOwner,
      },
    });
  } catch (error) {
    res.status(404).json({
      msg: 'Could not delete owner!',
      err: error,
    });
  }
};
