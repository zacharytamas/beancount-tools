import { AccountNameNode } from '@beancount/ast';

/**
 * Prints an AccountName.
 *
 * @param accountName An AccountNameNode to be printed.
 */
const printAccountName = (accountName: AccountNameNode): string => accountName.value;

export default printAccountName;
