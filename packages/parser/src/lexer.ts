import moo from 'moo';

const lexer = moo.compile({
  WS: /[ \t]+/,
  date: /[0-9]{4}[\-\/][0-9]{2}[\-\/][0-9]{2}/,
  accountName: /[a-zA-z][a-zA-Z0-9\:]+[a-zA-Z0-9]?/,
  string: { match: /"(?:\\["\\]|[^\n"\\])*"/, value: (s) => s.slice(1, -1) },
  keyword: [
    // Account directives
    'open',
    'close',

    // Transaction directives
    'txn',
    '*',
    '!',
  ],
  NL: { match: /\n/, lineBreaks: true },
});

export default lexer;
