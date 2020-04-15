export interface DateLiteralNode {
  type: 'DateLiteral';
}

const DateLiteral = (token: any) => ({ ...token, type: 'DateLiteral' });

export default DateLiteral;
