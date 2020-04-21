export type TransactionStatus = 'completed' | 'incomplete';

export type TransactionDirectives = 'txn' | '*' | '!';

export interface TransactionNode {
  type: 'Transaction';
  status: TransactionStatus;
  payee?: string;
  memo?: string;
}

interface TransactionOptions {
  status: TransactionStatus;
  payee?: string;
  memo?: string;
}

export const Transaction = (txnOptions: TransactionOptions): TransactionNode => {
  return { type: 'Transaction', ...txnOptions };
};
