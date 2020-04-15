import { Token } from 'moo';

export interface BaseToken extends Partial<Pick<Token, 'line' | 'col' | 'offset'>> {
  value: string;
}
