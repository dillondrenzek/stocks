export enum AccountType {
  None = 'None',
  Margin = 'Margin'
}

export function isAccountType(key: string): key is AccountType {
  return Object.keys(AccountType).includes(key);
}

export function getAccountType(data: string): AccountType {
  if (data.toLowerCase() === 'margin') {
    return AccountType.Margin;
  } else {
    return AccountType.None;
  }
}