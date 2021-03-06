import { AccountName, CloseStatement, DateLiteral, OpenStatement } from '@beancount/ast';

import accountBuilder from '../account';

it('prints appropriately', () => {
  const openDate = '2020-01-01';
  const closeDate = '2020-04-01';
  const accountName = 'Assets:Checking';

  const account = accountBuilder().name(accountName).openDate(openDate).closeDate(closeDate);

  expect(account.fold()).toMatchObject([
    OpenStatement(DateLiteral(openDate), AccountName(accountName)),
    CloseStatement(DateLiteral(closeDate), AccountName(accountName)),
  ]);
});
