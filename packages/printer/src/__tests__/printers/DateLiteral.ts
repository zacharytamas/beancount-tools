import { DateLiteral } from '@beancount/ast';

import printDateLiteral from '../../printers/DateLiteral';

it('should print appropriately', () => {
  expect(printDateLiteral(DateLiteral({ value: '2020-04-01' }))).toEqual('2020-04-01');
});
