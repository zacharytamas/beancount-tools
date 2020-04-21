import { TransactionNode } from '@beancount/ast';

interface IdentityFunctor<T> {
  map: <T2>(fn: (value: T) => T2) => IdentityFunctor<T2>;
  fold: () => T;
}

const Id = <T>(value: T): IdentityFunctor<T> =>
  ({
    map: (fn) => Id(fn(value)),
    fold: () => value,
  } as IdentityFunctor<T>);

interface TransactionBuilder {
  withStatus: (status: TransactionNode['status']) => TransactionBuilder;
  withPayee: (payee: TransactionNode['payee']) => TransactionBuilder;
  withMemo: (memo: TransactionNode['memo']) => TransactionBuilder;
  withProperties: (properties: Partial<TransactionNode>) => TransactionBuilder;
  fold: () => TransactionNode;
}

const setProperties = <TP, TO>(properties: Partial<TP>) => (node: TO) => ({
  ...node,
  ...properties,
});

const transaction = (
  value = Id<TransactionNode>({ type: 'Transaction', status: 'completed' })
): TransactionBuilder =>
  ({
    withStatus: (status) => transaction(value.map(setProperties({ status }))),
    withPayee: (payee) => transaction(value.map(setProperties({ payee }))),
    withMemo: (memo) => transaction(value.map(setProperties({ memo }))),
    withProperties: (properties) => transaction(value.map(setProperties(properties))),
    fold: () => value.fold(),
  } as TransactionBuilder);

export default transaction;
