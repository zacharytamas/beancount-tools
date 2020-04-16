import { BaseToken } from '../tokens';
import { BaseNode } from './BaseNode';

export interface DateLiteralNode extends BaseNode {
  type: 'DateLiteral';
  value: string;
}

export const DateLiteral = (token: BaseToken | string): DateLiteralNode => {
  if (typeof token === 'string') return { type: 'DateLiteral', value: token };

  const { value, line, col, offset } = token;
  return { type: 'DateLiteral', value, location: { line, col, offset } };
};
