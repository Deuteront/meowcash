const { DetailedAccount } = require('../modelos');

const create = async (action) => {
  const detailedAccount = new DetailedAccount(action);
  return detailedAccount.save();
};

const getById = async (id) => {
  return DetailedAccount.findById(id);
};

const get = async (detailedAccount = {}) => {
  return DetailedAccount.find(detailedAccount);
};

const update = async (id, data) => {
  return DetailedAccount.findByIdAndUpdate(id, data, { new: true });
};

const deleteById = async (id) => {
  return DetailedAccount.findByIdAndDelete(id);
};

const paginatedGet = async (detailedAccount = {}, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const data = DetailedAccount.find(detailedAccount)
    .skip(skip)
    .limit(limit);
  const total = DetailedAccount.countDocuments(detailedAccount);
  return await Promise.all([data, total]);
};

module.exports = {
  create,
  getById,
  get,
  update,
  deleteById,
  paginatedGet
};
