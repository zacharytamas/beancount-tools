import { OpenStatementNode } from '@beancount/ast';

import printAccountName from './AccountName';
import printDateLiteral from './DateLiteral';

/**
 * Prints an OpenStatementNode.
 *
 * @param openStatement An OpenStatementNode to be printed.
 */
const printOpenStatement = ({ date, account }: OpenStatementNode): string =>
  [printDateLiteral(date), 'open', printAccountName(account)].join(' ');

export default printOpenStatement;
