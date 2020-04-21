import {
  AccountName,
  CloseStatement,
  CloseStatementNode,
  DateLiteral,
  OpenStatement,
  OpenStatementNode,
} from '@beancount/ast';

interface AccountBuilderContext {
  accountName: string;
  openDate?: string;
  closeDate?: string;
}

interface AccountBuilder {
  name(accountName: string): AccountBuilder;
  openDate(date: string): AccountBuilder;
  closeDate(date: string): AccountBuilder;
  fold(): (OpenStatementNode | CloseStatementNode)[];
}

const accountBuilder = (data?: AccountBuilderContext): AccountBuilder => {
  return {
    name: (accountName: string) => accountBuilder({ ...data, accountName }),
    openDate: (date: string) => accountBuilder({ ...data, openDate: date }),
    closeDate: (date: string) => accountBuilder({ ...data, closeDate: date }),
    fold: () => {
      const { accountName, openDate, closeDate } = data;

      if (!accountName)
        throw new Error(
          'Cannot build Account statements because no name was specified via `name()`.'
        );

      return [
        openDate && OpenStatement(DateLiteral(openDate), AccountName(accountName)),
        closeDate && CloseStatement(DateLiteral(closeDate), AccountName(accountName)),
      ].filter(Boolean);
    },
  } as AccountBuilder;
};

export default accountBuilder;
