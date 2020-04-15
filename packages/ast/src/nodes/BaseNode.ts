import { Token } from 'moo';

export interface BaseNode {
  location?: Pick<Token, 'line' | 'col' | 'offset'>;
}
