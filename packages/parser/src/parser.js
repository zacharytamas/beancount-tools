// Generated automatically by nearley, version 2.19.1
// http://github.com/Hardmath123/nearley
(function() {
  function id(x) {
    return x[0];
  }

  const { OpenStatement, CloseStatement, AccountName, DateLiteral } = require('@beancount/ast');

  const moo = require('moo');

  const lexer = moo.compile({
    WS: /[ \t]+/,
    date: /[0-9]{4}[\-\/][0-9]{2}[\-\/][0-9]{2}/,
    accountName: /[a-zA-z][a-zA-Z0-9\:]+[a-zA-Z0-9]?/,
    keyword: ['open', 'close'],
    NL: { match: /\n/, lineBreaks: true }
  });
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
      { name: 'Statement', symbols: ['Statement$subexpression$1'], postprocess: id },
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
      { name: 'NL', symbols: [lexer.has('NL') ? { type: 'NL' } : NL], postprocess: () => null }
    ],
    ParserStart: 'Main'
  };
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = grammar;
  } else {
    window.grammar = grammar;
  }
})();
