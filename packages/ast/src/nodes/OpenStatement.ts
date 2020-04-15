import { AccountNameNode } from './AccountName';
import { BaseNode } from './BaseNode';
import { DateLiteralNode } from './DateLiteral';

export interface OpenStatementNode extends BaseNode {
  type: 'OpenStatement';
  date: DateLiteralNode;
  account: AccountNameNode;
}

export const OpenStatement = (
  date: DateLiteralNode,
  account: AccountNameNode
): OpenStatementNode => ({
  type: 'OpenStatement',
  location: date.location, // This statement effectively begins where its DateLiteralNode does.
  date,
  account,
});
