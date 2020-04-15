import { AccountName } from '@beancount/ast';

import printAccountName from '../../printers/AccountName';

it('should print appropriately', () => {
  expect(printAccountName(AccountName({ value: 'Assets:Checking' }))).toEqual('Assets:Checking');
});
