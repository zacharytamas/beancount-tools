@{%
const {OpenStatement, AccountName, DateLiteral} = require('@beancount/ast');

const moo = require("moo");

const lexer = moo.compile({
  WS:          /[ \t]+/,
  date:        /[0-9]{4}[\-\/][0-9]{2}[\-\/][0-9]{2}/,
  accountName: /[a-zA-z][a-zA-Z0-9\:]+[a-zA-Z0-9]?/,
  keyword:     ['open'],
});
%}

@lexer lexer

Main -> StatementList {% ([d]) => ({ type: 'Ledger', statements: d }) %}

StatementList -> (Statement | Statement %NL StatementList) {% d => d.flat(2) %}

Statement -> (OpenStatement) {% id %}

OpenStatement -> Date %WS "open" %WS AccountName {%
  ([date,,,,accountName]) => OpenStatement(date, accountName)
%}

AccountName -> %accountName {% ([d]) => AccountName(d) %}
Date -> %date {% ([d]) => DateLiteral(d) %}
