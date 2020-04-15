import { DateLiteralNode } from '@beancount/ast';

/**
 * Prints a DateLiteralNode.
 *
 * @param dateLiteral A DateLiteralNode to be printed.
 */
const printDateLiteral = (dateLiteral: DateLiteralNode): string => dateLiteral.value;

export default printDateLiteral;
