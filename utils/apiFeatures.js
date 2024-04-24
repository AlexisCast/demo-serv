const filterFunct = (model, objQuery) => {
  let queryStr = JSON.stringify(objQuery);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  return model.find(JSON.parse(queryStr));
};

const sortFunct = (query, sortStr) => {
  if (sortStr) {
    const sortBy = sortStr.split(',').join(' ');
    return query.sort(sortBy);
  }
  return query;
};

const fieldsFunct = (query, fieldsStr) => {
  if (fieldsStr) {
    const fieldsBy = fieldsStr.split(',').join(' ');
    query = query.select(fieldsBy);
  }
  return query;
};

const paginationFunct = (model, query, page, limit) => {
  const pageNum = page * 1;
  const limitNum = limit * 1;
  const skipNum = (pageNum - 1) * limitNum;

  return query.skip(skipNum).limit(limitNum);
};

module.exports = { filterFunct, sortFunct, fieldsFunct, paginationFunct };
