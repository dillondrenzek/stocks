# Stocks

A simple, personal stock trading manager

## v0.4.0

### `.env`

- `NODE_ENV` - `development` or `production`
- `MONGODB_URL` - url for `mongodb` connection
- `API_PORT` - port for API http server

---

### `/server`

- Development Scripts:
  - `build` directory
  - `serve` directory
  - `dev` watch changes and update served
  - `test`

#### `frontend`

- dev in another process
- `API`
  - layer to interface with `api`

#### `api`

- http server
- interfaces with `app` to persist and make calculations
- `API`
  - `RobinhoodApi`
    - `/account-activity GET` 
      - get all AccountActivity items
      - **Responses**:
      - **Errors**:
    - `/account-activity POST` 
      - create one or many
      - **Validations**:
      - **Responses**:
      - **Errors**:
    - `/account-activity PUT`
      - update an existing AccountActivity (one or many)
      - **Validations**:
        - make sure `_id` is defined
      - **Responses**:
      - **Errors**:
    - `/account-activity/:id GET`
      - read one item from `db`
      - **Responses**:
      - **Errors**:
    - `/account-activity?ids=id1,id2,idn DELETE`
      - delete one or many ids from `db`
      - **Validations**:
      - **Responses**:
      - **Errors**:
    - `/portfolio-summary POST`
      - create one or many
      - **Validations**:
      - **Responses**:
      - **Errors**:
    - `/portfolio-summary PUT`
      - update one or many
      - **Validations**:
      - **Responses**:
      - **Errors**:
    - `/portfolio-summary/:id GET`
      - read one (get)
      - **Responses**:
      - **Errors**:
    - `/portfolio-summary GET`
      - read many (list)
      - **Responses**:
      - **Errors**:
    - `/portfolio-summary?ids=id1,id2,idn DELETE`
      - delete
      - **Validations**:
      - **Responses**:
      - **Errors**:
  - `TransactionsApi`
  - `PortfoliosApi`

---

### `/cli`

#### `robinhood-pdf`

- command line tool for uploading PDFs
- Interfaces with `app` to save parsed pdf data
- `save`
- `print`

---

### `/app`

- TransactionController
- PortfolioController
- RobinhoodController

---

### `/db`

stores data that comes from various sources

#### `DBController`
- **`Models`**
  - **`Portfolio`** (Implemented)
  - **`StockTransaction`** (Implemented)
  - **`OptionTransaction`** (Implemented)
  - **`CryptoTransaction`** (Future)
  - **`AccountActivityItem`**
    - `create(x: AccountAcctivity | AccountActivity[])` - create one or many
    - `update(x: AccountActivity | AccountActivity[])` - update one or many
    - `findById(id: string)` - read one (get)
    - `findByIds(ids: string[]): AccountActivity[]` - read many (list)
    - `deleteByIds(ids: string | string[])` - delete
  - **`PortfolioSummaryItem`**
    - `create(x: AccountAcctivity | AccountActivity[])` - create one or many
    - `update(x: AccountActivity | AccountActivity[])` - update one or many
    - `findById(id: string)` - read one (get)
    - `findByIds(ids: string[]): AccountActivity[]` - read many (list)
    - `deleteByIds(ids: string | string[])` - delete
