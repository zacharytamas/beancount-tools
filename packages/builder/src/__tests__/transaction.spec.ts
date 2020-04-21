import transaction from '../transaction';

test('basic lifecylce', () => {
  expect(
    transaction().withStatus('incomplete').withPayee('Amazon').withMemo('Groceries').fold()
  ).toMatchObject({
    type: 'Transaction',
    status: 'incomplete',
    memo: 'Groceries',
    payee: 'Amazon',
  });

  expect(
    transaction()
      .withProperties({ status: 'incomplete', memo: 'Groceries', payee: 'Amazon' })
      .fold()
  ).toMatchObject({
    type: 'Transaction',
    status: 'incomplete',
    memo: 'Groceries',
    payee: 'Amazon',
  });
});
