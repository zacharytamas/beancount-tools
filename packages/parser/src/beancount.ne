@{%
const {
  OpenStatement,
  CloseStatement,
  AccountName,
  DateLiteral
} = require('@beancount/ast');

const moo = require("moo");

const lexer = moo.compile({
  WS:          /[ \t]+/,
  date:        /[0-9]{4}[\-\/][0-9]{2}[\-\/][0-9]{2}/,
  accountName: /[a-zA-z][a-zA-Z0-9\:]+[a-zA-Z0-9]?/,
  keyword:     ['open', 'close'],
  NL:          { match: /\n/, lineBreaks: true },
});
%}

@lexer lexer

Main -> StatementList {% ([d]) => ({ type: 'Ledger', statements: d }) %}

StatementList -> (Statement | Statement NL StatementList) {% d => d.flat(2).filter(Boolean) %}

Statement -> (OpenStatement | CloseStatement) {% id %}

CloseStatement -> Date %WS "close" %WS AccountName {%
  ([date,,,,accountName]) => CloseStatement(date, accountName)
%}

OpenStatement -> Date %WS "open" %WS AccountName {%
  ([date,,,,accountName]) => OpenStatement(date, accountName)
%}

AccountName -> %accountName {% ([d]) => AccountName(d) %}
Date -> %date {% ([d]) => DateLiteral(d) %}
NL -> %NL {% () => null %}
