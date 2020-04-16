import { BaseToken } from '../tokens';
import { BaseNode } from './BaseNode';

export interface AccountNameNode extends BaseNode {
  type: 'AccountName';
  value: string;
}

export const AccountName = (token: BaseToken | string): AccountNameNode => {
  if (typeof token === 'string') return { type: 'AccountName', value: token };

  const { value, line, col, offset } = token;
  return { type: 'AccountName', value, location: { line, col, offset } };
};
