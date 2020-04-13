export interface AccountNameNode {
  type: 'AccountName';
  value: string;
}

const AccountName = (token: any): AccountNameNode => ({ ...token, type: 'AccountName' });

export default AccountName;
