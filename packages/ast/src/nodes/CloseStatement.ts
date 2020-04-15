import { AccountNameNode } from './AccountName';
import { DateLiteralNode } from './DateLiteral';

export interface CloseStatementNode {
  date: DateLiteralNode;
  type: 'CloseStatement';
  account: AccountNameNode;
}

const CloseStatement = (date: DateLiteralNode, account: AccountNameNode): CloseStatementNode => ({
  date,
  account,
  type: 'CloseStatement',
});

export default CloseStatement;
