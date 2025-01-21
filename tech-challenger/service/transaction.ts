import { Filter, Transaction } from './interfaces';
import { service } from './facade';
import { getFromStorage } from '@/utils/storage';


const createTransaction = async (
  transaction: FormData,
): Promise<Transaction> => {
  return service.post<Transaction, FormData>(
    '/account/transaction',
    transaction,
    getFromStorage('authToken') as string,
  );
};

interface Statement {
  transactions: Transaction[];
  pagination: {
    total: number;
    page: number;
    pages: number;
    limit: 10;
  };
}

const getStatement = async (accountId: string, filter?: Filter): Promise<Statement> => {
  return service.get<Statement, Filter>(`/account/${accountId}/statement`, getFromStorage('authToken') as string, filter);
};

const editTransaction = async (
  transactionId: string,
  transaction: FormData,
): Promise<{
  message: string;
  result: Transaction;
}> => {
  return service.put<
    {
      message: string;
      result: Transaction;
    },
    FormData
  >(`/account/transaction/${transactionId}`, transaction, getFromStorage('authToken') as string);
};

const deleteTransaction = async (
  transactionId: string,
): Promise<{
  message: string;
}> => {
  return service.delete<{
    message: string;
  }>(`/account/transaction/${transactionId}`, getFromStorage('authToken') as string);
};

const downloadAnexo = async (anexo: string) => {
  return service.download(`/account/transaction/${anexo}`, getFromStorage('authToken') as string);
};

export const TransactionService = {
  createTransaction,
  getStatement,
  editTransaction,
  deleteTransaction,
  downloadAnexo,
};
