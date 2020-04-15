import { AccountNameNode } from './AccountName';
import { BaseNode } from './BaseNode';
import { DateLiteralNode } from './DateLiteral';

export interface CloseStatementNode extends BaseNode {
  type: 'CloseStatement';
  date: DateLiteralNode;
  account: AccountNameNode;
}

export const CloseStatement = (
  date: DateLiteralNode,
  account: AccountNameNode
): CloseStatementNode => ({
  type: 'CloseStatement',
  location: date.location, // This statement effectively begins where its DateLiteralNode does.
  date,
  account,
});
