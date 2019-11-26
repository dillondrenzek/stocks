# Stocks

A simple, personal stock trading manager

## v0.4.0

### `.env`

- `NODE_ENV` - `development` or `production`
- `MONGODB_URL` - url for `mongodb` connection
- `API_PORT` - port for API http server

### `frontend`

- dev in another process
- has an API layer to interface with `API`

### `api`

- unique process
  - http server
- takes http requests
- http server run in a process
- `RobinhoodPDFController`
  - `/account-activity GET` - get all AccountActivity items
  - `/account-activity POST` - create one or many
    - validate input
    - use `db` to persist
  - `/account-activity PUT` - update an existing AccountActivity - update one or many
    - validate input
      - make sure `_id` is defined
    - use `db` to persist
  - `/account-activity/:id GET` - read one item from `db`
  - `/account-activity?ids=id1,id2,idn DELETE` - delete one or many ids from `db`
  - `/portfolio-summary POST` - create one or many
  - `/portfolio-summary PUT` - update one or many
  - `/portfolio-summary/:id GET` - read one (get)
  - `/portfolio-summary GET` - read many (list)
  - `/portfolio-summary?ids=id1,id2,idn DELETE` - delete
- `PortfolioController`

---

### `robinhood-pdf`

- command line tool for uploading PDFs
- transform into models in `db`
- save into `db`
- `save`
- `print`

---

### `db`

stores data that comes from various sources

- `app`
  - **`Portfolio`** (Implemented)
  - **`StockTransaction`** (Implemented)
  - **`OptionTransaction`** (Implemented)
  - **`CryptoTransaction`** (Future)
- `robinhood-pdf`
  - **`AccountActivity`**
    - `create(x: AccountAcctivity | AccountActivity[])` - create one or many
    - `update(x: AccountActivity | AccountActivity[])` - update one or many
    - `findById(id: string)` - read one (get)
    - `findByIds(ids: string[]): AccountActivity[]` - read many (list)
    - `deleteByIds(ids: string | string[])` - delete
  - **`PortfolioSummary`**
    - `create(x: AccountAcctivity | AccountActivity[])` - create one or many
    - `update(x: AccountActivity | AccountActivity[])` - update one or many
    - `findById(id: string)` - read one (get)
    - `findByIds(ids: string[]): AccountActivity[]` - read many (list)
    - `deleteByIds(ids: string | string[])` - delete

