import nearley from 'nearley';

import grammar from '../parser';

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

describe('`open` statements', () => {
  it('should parse properly', () => {
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
