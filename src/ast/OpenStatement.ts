import { DateLiteralNode } from './DateLiteral';

export interface OpenStatementNode {
  date: DateLiteralNode;
  type: 'OpenStatement';
}

const OpenStatement = (date: DateLiteralNode): OpenStatementNode => ({
  date,
  type: 'OpenStatement',
});

export default OpenStatement;
