// Generated automatically by nearley, version 2.19.1
// http://github.com/Hardmath123/nearley
(function () {
  function id(x) {
    return x[0];
  }

  const OpenStatement = require('./ast/OpenStatement').default;
  const AccountName = require('./ast/AccountName').default;
  const DateLiteral = require('./ast/DateLiteral').default;

  const moo = require('moo');

  const lexer = moo.compile({
    WS: /[ \t]+/,
    date: /[0-9]{4}[\-\/][0-9]{2}[\-\/][0-9]{2}/,
    accountName: /[a-zA-z][a-zA-Z0-9\:]+[a-zA-Z0-9]?/,
    keyword: ['open'],
  });
  var grammar = {
    Lexer: lexer,
    ParserRules: [
      { name: 'Main', symbols: ['OpenStatement'] },
      {
        name: 'OpenStatement',
        symbols: ['Date', lexer.has('WS') ? { type: 'WS' } : WS, { literal: 'open' }],
        postprocess: ([date]) => OpenStatement(date),
      },
      {
        name: 'AccountName',
        symbols: [lexer.has('accountName') ? { type: 'accountName' } : accountName],
        postprocess: ([d]) => AccountName(d),
      },
      {
        name: 'Date',
        symbols: [lexer.has('date') ? { type: 'date' } : date],
        postprocess: ([d]) => DateLiteral(d),
      },
    ],
    ParserStart: 'Main',
  };
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = grammar;
  } else {
    window.grammar = grammar;
  }
})();
