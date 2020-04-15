import { BaseToken } from '../tokens';
import { BaseNode } from './BaseNode';

export interface DateLiteralNode extends BaseNode {
  type: 'DateLiteral';
  value: string;
}

export const DateLiteral = ({ value, line, col, offset }: BaseToken): DateLiteralNode => ({
  type: 'DateLiteral',
  value,
  location: { line, col, offset },
});
