---
layout: default
title: DB
edited: August 26, 2019
version: 2
---

# DB

## Portfolio

- **static** `createByName`
  - increases number of Portfolios by 1
  - returns the created Portfolio
  - created Portfolio has it's name set to the given name
- `name`
- `holdings`
- `createHoldingBySymbol()`
  - if Holding exists
    - do nothing
  - if Holding with symbol does not exist
    - `holdings[symbol]` exists
- `addTransaction()`
  - creates new Transaction
  - if `holdings[`Transaction.`symbol]` exists
    - adds Transaction `id` to Holding `trades`
  - if `holdings[`Transaction.`symbol]` does not exist
    - adds `Holding` with same `symbol`
    - adds Transaction `id` to Holding `trades`
- `deleteTransaction()`
  - deletes the Transaction
  - removes the Transaction `id` from Holding `trades`
