import http from '../lib/http';
import { AccountActivityItem } from '../../../robinhood-pdf/models/account-activity';

export const AccountActivityApi = {
  getAccountActivity: (cb: (items: AccountActivityItem[]) => void) => {
    http.get('http://localhost:7000/api/account-activity')
      .then((res) => cb(res.data))
      .catch(console.error);
  }
};
