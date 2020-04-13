// Generated automatically by nearley, version 2.19.1
// http://github.com/Hardmath123/nearley
(function () {
  function id(x) {
    return x[0];
  }

  const OpenStatement = require('./ast/OpenStatement').default;

  const moo = require('moo');

  const lexer = moo.compile({
    WS: /[ \t]+/,
    date: /[0-9]{4}[\-\/][0-9]{2}[\-\/][0-9]{2}/,
    keyword: ['open'],
  });
  var grammar = {
    Lexer: lexer,
    ParserRules: [
      { name: 'Main', symbols: ['OpenStatement'] },
      {
        name: 'OpenStatement',
        symbols: [
          lexer.has('date') ? { type: 'date' } : date,
          lexer.has('WS') ? { type: 'WS' } : WS,
          { literal: 'open' },
        ],
        postprocess: ([date]) => OpenStatement(date),
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
