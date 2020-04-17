// Generated automatically by nearley, version 2.19.1
// http://github.com/Hardmath123/nearley
(function() {
  function id(x) {
    return x[0];
  }

  const {
    OpenStatement,
    CloseStatement,
    AccountName,
    DateLiteral,
    StringLiteral
  } = require('@beancount/ast');

  const lexer = require('./lexer').default;
  var grammar = {
    Lexer: lexer,
    ParserRules: [
      {
        name: 'Main',
        symbols: ['StatementList'],
        postprocess: ([d]) => ({ type: 'Ledger', statements: d })
      },
      { name: 'StatementList$subexpression$1', symbols: ['Statement'] },
      { name: 'StatementList$subexpression$1', symbols: ['Statement', 'NL', 'StatementList'] },
      {
        name: 'StatementList',
        symbols: ['StatementList$subexpression$1'],
        postprocess: d => d.flat(2).filter(Boolean)
      },
      { name: 'Statement$subexpression$1', symbols: ['OpenStatement'] },
      { name: 'Statement$subexpression$1', symbols: ['CloseStatement'] },
      { name: 'Statement$subexpression$1', symbols: ['TransactionStatement'] },
      { name: 'Statement', symbols: ['Statement$subexpression$1'], postprocess: id },
      {
        name: 'TransactionStatement',
        symbols: [
          'Date',
          lexer.has('WS') ? { type: 'WS' } : WS,
          'TransactionDirective',
          lexer.has('WS') ? { type: 'WS' } : WS,
          'String'
        ],
        postprocess: ([date, , directive, , payee]) => ({
          type: 'Transaction',
          date,
          payee,
          status: directive.value === '!' ? 'incomplete' : 'completed'
        })
      },
      {
        name: 'CloseStatement',
        symbols: [
          'Date',
          lexer.has('WS') ? { type: 'WS' } : WS,
          { literal: 'close' },
          lexer.has('WS') ? { type: 'WS' } : WS,
          'AccountName'
        ],
        postprocess: ([date, , , , accountName]) => CloseStatement(date, accountName)
      },
      {
        name: 'OpenStatement',
        symbols: [
          'Date',
          lexer.has('WS') ? { type: 'WS' } : WS,
          { literal: 'open' },
          lexer.has('WS') ? { type: 'WS' } : WS,
          'AccountName'
        ],
        postprocess: ([date, , , , accountName]) => OpenStatement(date, accountName)
      },
      { name: 'TransactionDirective', symbols: [{ literal: '*' }] },
      { name: 'TransactionDirective', symbols: [{ literal: 'txn' }] },
      { name: 'TransactionDirective', symbols: [{ literal: '!' }] },
      {
        name: 'AccountName',
        symbols: [lexer.has('accountName') ? { type: 'accountName' } : accountName],
        postprocess: ([d]) => AccountName(d)
      },
      {
        name: 'Date',
        symbols: [lexer.has('date') ? { type: 'date' } : date],
        postprocess: ([d]) => DateLiteral(d)
      },
      { name: 'NL', symbols: [lexer.has('NL') ? { type: 'NL' } : NL], postprocess: () => null },
      {
        name: 'String',
        symbols: [lexer.has('string') ? { type: 'string' } : string],
        postprocess: ([d]) => StringLiteral(d)
      }
    ],
    ParserStart: 'Main'
  };
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = grammar;
  } else {
    window.grammar = grammar;
  }
})();
