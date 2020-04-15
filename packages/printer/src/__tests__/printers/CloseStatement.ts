import { AccountName, CloseStatement, DateLiteral } from '@beancount/ast';

import printCloseStatement from '../../printers/CloseStatement';

it('should print appropriately', () => {
  expect(
    printCloseStatement(
      CloseStatement(
        DateLiteral({ value: '2020-04-01' }),
        AccountName({ value: 'Assets:Checking' })
      )
    )
  ).toEqual('2020-04-01 close Assets:Checking');
});
