import { Filter, Transaction } from '@/service/interfaces';
import { TransactionService } from '@/service/transaction';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useTransactionContext } from '../providers/transaction-context';

function fetchAccountStatement(accountId: string, filter?: Filter) {
  return TransactionService.getStatement(accountId, filter);
}

function useStatementQuery(filter?: Filter) {
  const {accounts} = useTransactionContext();
  const accountId = accounts[0]?.id ?? '';
  return useInfiniteQuery({
    enabled: Boolean(accountId),
    initialPageParam: 1,
    queryKey: ['statements', accountId, JSON.stringify(filter ?? {})],
    queryFn: (x) => {
      const z = {
        ...filter,
        page: x.pageParam,
      } as Filter;
      return fetchAccountStatement(accountId, z);
    },
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pagination.page + 1;
      if (nextPage > lastPage.pagination.pages) {
        return null;
      }
      return nextPage;
    },
    select(data) {
      return data.pages.reduce<Transaction[]>((transactions, page) => {
        return [...transactions, ...page.transactions];
      }, []);
    },
  });
}

export {
  useStatementQuery,
};