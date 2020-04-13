@{%
const OpenStatement = require('./ast/OpenStatement').default;
const DateLiteral = require('./ast/DateLiteral').default;

const moo = require("moo");

const lexer = moo.compile({
  WS:          /[ \t]+/,
  date:        /[0-9]{4}[\-\/][0-9]{2}[\-\/][0-9]{2}/,
  keyword:     ['open'],
});
%}

@lexer lexer

Main -> OpenStatement

OpenStatement -> Date %WS "open" {% ([date]) => OpenStatement(date) %}

Date -> %date {% ([d]) => DateLiteral(d) %}
