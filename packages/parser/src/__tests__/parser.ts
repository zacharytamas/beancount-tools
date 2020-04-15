import { stripIndents } from 'common-tags';
import nearley from 'nearley';

import grammar from '../parser';

const getParser = () => new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

test('parsing whole document', () => {
  const parser = getParser();
  const document = stripIndents`
    2014-02-03 open Assets:US:BofA:Checking
    2014-02-05 close Assets:US:BofA:Checking
  `;

  parser.feed(document);

  expect(parser.results).toMatchObject([
    {
      type: 'Ledger',
      statements: [
        {
          date: { type: 'DateLiteral', value: '2014-02-03' },
          type: 'OpenStatement',
          account: { type: 'AccountName', value: 'Assets:US:BofA:Checking' },
        },
        {
          date: { type: 'DateLiteral', value: '2014-02-05' },
          type: 'CloseStatement',
          account: { type: 'AccountName', value: 'Assets:US:BofA:Checking' },
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
