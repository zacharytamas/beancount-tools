import { BaseToken } from '../tokens';
import { BaseNode } from './BaseNode';

export interface AccountNameNode extends BaseNode {
  type: 'AccountName';
  value: string;
}

export const AccountName = ({ value, line, col, offset }: BaseToken): AccountNameNode => ({
  type: 'AccountName',
  value,
  location: { line, col, offset },
});
