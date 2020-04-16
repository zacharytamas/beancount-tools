import { CloseStatementNode } from '@beancount/ast';

import printAccountName from './AccountName';
import printDateLiteral from './DateLiteral';

const printCloseStatement = ({ date, account }: CloseStatementNode): string =>
  [printDateLiteral(date), 'close', printAccountName(account)].join(' ');

export default printCloseStatement;
