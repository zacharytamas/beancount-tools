import { AccountName, CloseStatement, DateLiteral, OpenStatement } from '@beancount/ast';

interface AccountBuilderContext {
  accountName: string;
  openDate?: string;
  closeDate?: string;
}

const accountBuilder = (data?: AccountBuilderContext) => {
  return {
    name: (accountName: string) => accountBuilder({ ...data, accountName }),
    open: (date: string) => accountBuilder({ ...data, openDate: date }),
    close: (date: string) => accountBuilder({ ...data, closeDate: date }),
    build: () => {
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
  };
};

export default accountBuilder;
