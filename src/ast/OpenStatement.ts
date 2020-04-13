import { AccountNameNode } from './AccountName';
import { DateLiteralNode } from './DateLiteral';

export interface OpenStatementNode {
  date: DateLiteralNode;
  type: 'OpenStatement';
  account: AccountNameNode;
}

const OpenStatement = (date: DateLiteralNode, account: AccountNameNode): OpenStatementNode => ({
  date,
  account,
  type: 'OpenStatement',
});

export default OpenStatement;
