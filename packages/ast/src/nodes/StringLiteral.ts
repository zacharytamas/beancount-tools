import { BaseToken } from '../tokens';
import { BaseNode, extractLocation } from './BaseNode';

export interface StringLiteralNode extends BaseNode {
  type: 'StringLiteral';
  value: string;
}

export const StringLiteral = (token: BaseToken | string): StringLiteralNode => {
  if (typeof token === 'string') return { type: 'StringLiteral', value: token };

  const location = extractLocation(token);
  const { value } = token;
  return { type: 'StringLiteral', value, location };
};
