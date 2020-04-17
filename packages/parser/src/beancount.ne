@{%
const {
  OpenStatement,
  CloseStatement,
  AccountName,
  DateLiteral,
  StringLiteral
} = require('@beancount/ast');

const lexer = require("./lexer").default;
%}

@lexer lexer

Main -> StatementList {% ([d]) => ({ type: 'Ledger', statements: d }) %}

StatementList -> (Statement | Statement NL StatementList) {% d => d.flat(2).filter(Boolean) %}

Statement -> (OpenStatement | CloseStatement | TransactionStatement) {% id %}

TransactionStatement -> Date %WS TransactionDirective %WS String {%
  ([date, , directive, , payee]) => ({
    type: 'Transaction',
    date,
    payee,
    status: directive.value === '!' ? "incomplete" : "completed"
   })
%}

CloseStatement -> Date %WS "close" %WS AccountName {%
  ([date,,,,accountName]) => CloseStatement(date, accountName)
%}

OpenStatement -> Date %WS "open" %WS AccountName {%
  ([date,,,,accountName]) => OpenStatement(date, accountName)
%}

TransactionDirective -> "*" | "txn" | "!"

AccountName -> %accountName {% ([d]) => AccountName(d) %}
Date -> %date {% ([d]) => DateLiteral(d) %}
NL -> %NL {% () => null %}
String -> %string {% ([d]) => StringLiteral(d) %}
