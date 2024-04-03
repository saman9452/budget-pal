import React from 'react';
import Link from "next/link";
import DeleteBtn from "./DeleteBtn";
import { HiPencilAlt } from "react-icons/hi";

interface TransactionProps {
  transaction: {
    _id: string,
    title: string;
    amount: number;
    type: string;
    category: string;
  };
}

export default function Transaction ({ transaction }: TransactionProps) {

  const sign = transaction.amount < 0 ? '-' : '+';
    const timestamp = transaction._id.toString().substring(0,8);
    const date = new Date( parseInt( timestamp, 16 ) * 1000 );
    

    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });

  return (
    <li className={transaction.type =="expense" ? "minus": "plus"}>
      <div className='flex justify-between'>
        {transaction.title} <span>{sign}${Math.abs(transaction.amount)}</span>
      </div>
      <div className='subtext justify-between flex text-slate-400 text-sm'>
        <span>{transaction.category}</span> <span>{formattedDate}</span>
      </div>
      <div className="flex gap-2">
        <DeleteBtn id={transaction._id} />
        <Link href={`/editTopic/${transaction._id}`}>
          <HiPencilAlt size={24} />
        </Link>
      </div>
    </li>
  )
}
