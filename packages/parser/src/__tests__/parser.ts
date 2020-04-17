import { stripIndents } from 'common-tags';
import nearley from 'nearley';

import { AccountName, DateLiteral } from '@beancount/ast';

import grammar from '../parser';

const getParser = () => new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

test('parsing whole document', () => {
  const parser = getParser();
  const document = stripIndents`
    2014-02-03 open Assets:Checking
    2014-02-05 close Assets:Checking
    2014-02-04 * "Transfer to Savings"
  `;

  parser.feed(document);

  expect(parser.results).toMatchObject([
    {
      type: 'Ledger',
      statements: [
        {
          date: DateLiteral('2014-02-03'),
          type: 'OpenStatement',
          account: AccountName('Assets:Checking'),
        },
        {
          date: DateLiteral('2014-02-05'),
          type: 'CloseStatement',
          account: AccountName('Assets:Checking'),
        },
        {
          type: 'Transaction',
          date: DateLiteral('2014-02-04'),
          status: 'completed',
          payee: { type: 'StringLiteral', value: 'Transfer to Savings' },
        },
      ],
    },
  ]);
});

describe('`open` statements', () => {
  it('should parse properly', () => {
    const parser = getParser();

    parser.feed('2014-02-03 open Assets:US:BofA:Checking');
    parser.finish();
    expect(parser.results).toMatchObject([
      {
        type: 'Ledger',
        statements: [
          {
            date: { type: 'DateLiteral', value: '2014-02-03' },
            type: 'OpenStatement',
            account: { type: 'AccountName', value: 'Assets:US:BofA:Checking' },
          },
        ],
      },
    ]);
  });
});
