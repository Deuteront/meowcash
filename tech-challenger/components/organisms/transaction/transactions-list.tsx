import { Transaction } from '@/service/interfaces';
import { TransactionsDetails } from './transactions-details';
import { PropsWithChildren, ReactElement, useEffect } from 'react';
import { Button } from '@/components/atoms/button/button';
import { useInView } from 'react-intersection-observer';

interface TransactionListProps {
  canLoadMore: boolean;
  edit: (id: Transaction['id']) => void;
  exclude: (id: Transaction['id']) => void;
  loading?: boolean;
  onLoadMore: () => void;
  transactions?: Transaction[];
}

function None(props: PropsWithChildren): ReactElement {
  return (
    <div className="transactions-none">
      {props.children}
    </div>
  );
}

function LoadingList(): ReactElement {
  return (
    <None>
      <span>Carregando?</span>
    </None>
  );
}

function EmptyList(): ReactElement {
  return (
    <None>
      <span>Já realizou alguma transação?</span>
      <span>Nenhuma transação encontrada.</span>
    </None>
  );
}

function TransactionList(props: TransactionListProps) {
  const {loading, transactions, canLoadMore, onLoadMore} = props;
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView && canLoadMore) {
      onLoadMore();
    }
  }, [canLoadMore, inView, onLoadMore]);
  if (loading) {
    return (
      <LoadingList/>
    );
  }
  if (!transactions || !transactions.length) {
    return (
      <EmptyList/>
    );
  }

  return (
    <div className="transactions-list">
      {
        transactions.map((item) => (
          <TransactionsDetails
            edit={props.edit}
            exclude={props.exclude}
            key={item.id}
            transaction={item}
          />
        ))
      }
      <div className="transactions-list__load-more" ref={ref}>
        {
          canLoadMore ? (
            <Button className={['button', 'primary-button']} onClick={onLoadMore} disabled={!canLoadMore}>
              Carregar mais transações
            </Button>
          ) : null
        }
      </div>
    </div>
  );
}

export {
  TransactionList,
};