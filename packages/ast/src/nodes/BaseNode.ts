import { Token } from 'moo';

import { BaseToken } from '../tokens';

export type NodeLocation = Pick<Token, 'line' | 'col' | 'offset'>;

export interface BaseNode {
  location?: NodeLocation;
}

export const extractLocation = (baseToken: BaseToken): NodeLocation => {
  const { line, col, offset } = baseToken;
  return { line, col, offset };
};
