"use client"

import Transaction from "./Transaction";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchTransactions } from '../redux/features/transaction-slice';
import { AppDispatch } from "../redux/store";

interface Transaction {
  _id: string;
  title: string;
  amount: number,
  type: string,
  category: string
}

export default function TransactionsList() {
    const dispatch = useDispatch<AppDispatch>();
    const { transactions, status, error } = useSelector((state: RootState) => state.transactionReducer);
  
    useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchTransactions());
      }
    }, [status, dispatch]);

    if (status === 'loading') {
        return <div>Loading...</div>;
      }
    
      if (status === 'failed') {
        return <div>Error: {error}</div>;
      }

  return (
    <>
      {transactions.map((t: Transaction) => (
        <ul
          key={t._id}
          className="p-4 border border-slate-300 my-3 gap-5" //items-start 
        >
            <Transaction transaction={t}/>
        </ul>
      ))}
    </>
  );
}
