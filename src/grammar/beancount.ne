@{%
const OpenStatement = require('./ast/OpenStatement').default;
const AccountName = require('./ast/AccountName').default;
const DateLiteral = require('./ast/DateLiteral').default;

const moo = require("moo");

const lexer = moo.compile({
  WS:          /[ \t]+/,
  date:        /[0-9]{4}[\-\/][0-9]{2}[\-\/][0-9]{2}/,
  accountName: /[a-zA-z][a-zA-Z0-9\:]+[a-zA-Z0-9]?/,
  keyword:     ['open'],
});
%}

@lexer lexer

Main -> OpenStatement

OpenStatement -> Date %WS "open" %WS AccountName {%
  ([date,,,,accountName]) => OpenStatement(date, accountName)
%}

AccountName -> %accountName {% ([d]) => AccountName(d) %}
Date -> %date {% ([d]) => DateLiteral(d) %}
