import { AccountName, DateLiteral, OpenStatement } from '@beancount/ast';

import printOpenStatement from '../../printers/OpenStatement';

it('should print appropriately', () => {
  expect(
    printOpenStatement(
      OpenStatement(DateLiteral({ value: '2020-04-01' }), AccountName({ value: 'Assets:Checking' }))
    )
  ).toEqual(`2020-04-01 open Assets:Checking`);
});
