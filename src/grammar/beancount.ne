@{%
const OpenStatement = require('./ast/OpenStatement').default;

const moo = require("moo");

const lexer = moo.compile({
  WS:          /[ \t]+/,
  date:        /[0-9]{4}[\-\/][0-9]{2}[\-\/][0-9]{2}/,
  keyword:     ['open'],
});
%}

@lexer lexer

Main -> OpenStatement

OpenStatement -> %date %WS "open" {% ([date]) => OpenStatement(date) %}
