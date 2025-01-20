const DetailedAccountModel = require('../../models/DetailedAccount');

function getMongoFilter(filter) {
  const mongoFilter = {};
  if (!!filter.dateInitial) {
    mongoFilter.date = { ...mongoFilter.date, $gte: new Date(filter.dateInitial) };
  }
  if (!!filter.dateFinal) {
    mongoFilter.date = { ...mongoFilter.date, $lte: new Date(filter.dateFinal) };
  }
  if (filter.accountId) mongoFilter.accountId = filter.accountId;
  if (filter.type) mongoFilter.type = filter.type;
  if (!!filter.valueInitial) {
    mongoFilter.value = { ...mongoFilter.value, $gte: filter.valueInitial };
  }
  if (!!filter.valueFinal) {
    mongoFilter.value = { ...mongoFilter.value, $lte: filter.valueFinal };
  }
  if (filter.text) {
    mongoFilter.$or = [
      { from: { $regex: filter.text, $options: 'i' } },
      { to: { $regex: filter.text, $options: 'i' } },
    ];
  }
  if (filter.anexo !== undefined) {
    mongoFilter.anexo = filter.anexo ? { $ne: '' } : { $eq: '' };
  }
  return mongoFilter;
}

const getPaginatedTransaction = async ({ filter, repository }) => {
  const mongoFilter = getMongoFilter(filter);
  const [data, total] = await repository.paginatedGet(mongoFilter, filter.page, filter.limit);
  const transactions = (data ?? []).map(transaction => new DetailedAccountModel(transaction));
  return {
    transactions,
    total,
  };
};
module.exports = getPaginatedTransaction;