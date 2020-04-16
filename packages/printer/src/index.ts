import {
  AccountNameNode,
  CloseStatementNode,
  DateLiteralNode,
  OpenStatementNode,
} from '@beancount/ast';

import printAccountName from './printers/AccountName';
import printCloseStatement from './printers/CloseStatement';
import printDateLiteral from './printers/DateLiteral';
import printOpenStatement from './printers/OpenStatement';

type BeancountNode = OpenStatementNode | CloseStatementNode | DateLiteralNode | AccountNameNode;

export const print = (node: BeancountNode) => {
  switch (node.type) {
    case 'OpenStatement':
      return printOpenStatement(node);
    case 'CloseStatement':
      return printCloseStatement(node);
    case 'DateLiteral':
      return printDateLiteral(node);
    case 'AccountName':
      return printAccountName(node);
  }
};
