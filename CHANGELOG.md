# Changelog

## History

### v0.3.0

- create option transaction table
  - make sure deleting an option transaction works
- show the option transaction table in addition to the stock transaction table
- create option transaction form
- create dropdown switch to switch types of transactions
- submit option transaction form submits data to endpoint

### v0.2.3

- Frontend refactored to support new backend
  - create stock transactions from transaction form
  - select a holding from a portfolio
  - list transactions from selected portfolio

### v0.2.2

- when fetching a Portfolio by id via the API, the transactions array is populated with full objects

### v0.2.1

- updated Portfolio, Holding, Transaction schema
- Portfolios are saved with their Holdings
- Transactions are saved in a separate collection
- 10/10 tests passing

### v0.1.0

- Portfolios API added
