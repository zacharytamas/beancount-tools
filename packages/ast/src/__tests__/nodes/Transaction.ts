import { Transaction } from '../../nodes/Transaction';

test('it can be constructed correctly', () => {
  expect(Transaction({ status: 'completed' })).toMatchObject({
    type: 'Transaction',
    status: 'completed',
  });
});
