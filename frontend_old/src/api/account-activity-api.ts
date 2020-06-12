import http from '../lib/http';
import { AccountActivityItem } from '../types/account-activity';

export const AccountActivityApi = {
  getAccountActivity: (cb: (items: AccountActivityItem[]) => void) => {
    http.get<AccountActivityItem[]>('http://localhost:7000/api/account-activity')
      .then((res) => cb(res.data.map((x) => new AccountActivityItem(x))))
      .catch(console.error);
  }
};
