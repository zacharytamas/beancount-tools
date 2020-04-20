export type TransactionStatus = 'completed' | 'incomplete';

export type TransactionDirectives = 'txn' | '*' | '!';

export interface TransactionNode {
  type: 'Transaction';
  status: TransactionStatus;
}

interface TransactionOptions {
  status: TransactionStatus;
}

export const Transaction = ({ status }: TransactionOptions): TransactionNode => {
  return { type: 'Transaction', status };
};
