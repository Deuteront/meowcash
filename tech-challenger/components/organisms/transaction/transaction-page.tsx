'use client';

import React, { useState } from 'react';
import { Button } from '@/components/atoms/button/button';
import ModalWrapper from '@/components/atoms/modal-wrapper/modal-wrapper';
import ModalTransaction from '@/components/organisms/modal-transaction/modal-transaction';
import { TransactionList } from './transactions-list';
import { useTransactionContext } from '@/components/organisms/providers/transaction-context';
import { Filter, Transaction } from '@/service/interfaces';
import { TransactionFilter } from '@/components/organisms/transaction/transaction-filter';
import { useStatementQuery } from './use-statement-query';

const initialFilter: Filter = {
  dateInitial: '',
  dateFinal: '',
  valueFinal: 0,
  valueInitial: 0,
  text: '',
  type: '',
  anexo: undefined,
};

export function TransactionPage() {
  const {removeTransaction} = useTransactionContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>(initialFilter);

  const [transactionId, setTransactionId] =
    useState<Transaction['id']>(undefined);

  const openModal = (id?: Transaction['id']) => {
    setTransactionId(id);
    setIsModalOpen(true);
  };
  const {
    data = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    refetch
  } = useStatementQuery(filter);

  const onChangeFilter = (filter: Filter) => {
    setFilter(filter);
  };

  const remove = async (id: Transaction['id']) => {
    removeTransaction(id);
    await refetch();
  };

  const closeModal = async (isRefetch?: boolean) => {
    isRefetch && await refetch();
    setIsModalOpen(false);
  };


  const onLoadMore = (): void => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };
  return (
    <>
      <div className="transactions">
        <div className="row">
          <div className="d-flex flex-row justify-content-between">
            <span className="transactions-title">Transações recentes</span>
            <Button
              onClick={() => openModal()}
              icon="plus.svg"
              className={['button', 'primary-button', 'add-button-transitions']}
            ></Button>
          </div>
        </div>
        <TransactionFilter filter={filter} onChange={onChangeFilter}/>
        <TransactionList
          canLoadMore={hasNextPage}
          edit={openModal}
          exclude={remove}
          loading={isPending}
          onLoadMore={onLoadMore}
          transactions={data}
        />
      </div>
      <ModalWrapper isOpen={isModalOpen} title="">
        <ModalTransaction
          closeModal={closeModal}
          transactionId={transactionId}
        />
      </ModalWrapper>
    </>
  );
}