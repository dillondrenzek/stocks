---
layout: default
title: DB
edited: August 30, 2019
version: 3
---

# DB

## Portfolio

```ts

  Portfolio.createByName(name: string) => Portfolio;

  name: string;
  holding: Holding[];
  addTransaction: (t: Transaction) => Portfolio;
  deleteTransaction: (t: Transaction) => Portfolio;
  addHoldingBySymbol: (symbol: string) => Portfolio;
  removeHoldingBySymbol: (symbol: string) => Portfolio;

  totalCost(forSymbol?: string) => number;
  profitLoss(forSymbol?: string) => number;
  unrealizedGainLoss(forSymbol?: string) => number;
  realizedGainLoss(forSymbol?: string) => number;

```

- **static** `createByName(name: string) => Portfolio`
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
  - if `holdings[symbol]` exists
    - adds Transaction `id` to Holding `trades`
  - if `holdings[symbol]` does not exist
    - adds Holding with same `symbol`
    - adds Transaction `id` to Holding `trades`
- `deleteTransaction()`
  - deletes the Transaction
  - removes the Transaction `id` from Holding `trades`

### Helper **Holding** functions

- `createHolding(Transaction[], Holding?) => Holding`
  1. (a) calculates initial state of Holding if not provided
- `addTransaction(Transaction, Holding?) => Holding`
  1. updates Holding
- `totalCost(Transaction) => number`
  - if (sale)
    - return: (shares sold * sell price)
  - if (purchase)
    - return: (shares bought * buy price)
- `totalCost(Transaction[])`
  1. sum total cost of each transaction
- `costBasis(Transaction[], key: string) => number`
  1. (a) total cost
  1. (b) add up total number of shares acquired
  1. return: (a) / (b)
- `profitLoss(Transaction[], key: string) => number`
  - **Requires current value of Holding**
- `unrealizedGainLoss(Transaction[], key: string) => number`
  1. (a) get total cost
  1. (b) get total amount of sales
  1. return: (a) - (b)
- `realizedGainLoss(Transaction[], key: string) => number`
  1. (a) get cost basis
  1. (b) get total value of sales
  1. (c) get # of shares sold
  1. return: (a) - (b)

buy 3 for avg 120, total 360

sell 1 for 130
2 remain (shares held - shares sold)
realized 10 gain (value of sale - (cost basis * shares sold))

sell 1 for 135
1 remain (shares held - shares sold)
realized 15 gain (value of sale - cost basis)

buy 1 for 125
2 remain (shares held + shares bought)
avg 122.5 = (1 share @ 120, 1 share @ 125) / shares held

buy 2 for 118
4 remain (shares held + shares bought)
total cost = ((shares held * avg cost) + (shares bought * buy price))
avg 120.25 = (total cost / (shares held + shares bought))

sell 3 for 123
value of sale = (shares sold * sell price)
1 remain (shares held - shares sold)
realized 8.25 gain (value of sale) - (shares sold * avg cost)

---

## Transaction

```ts

  type: 'stock' | 'option';

  symbol: string;

  // option
  strikePrice: number;
  callPut: 'call' | 'put';
  expirationDate: string; // MM-DD-YYYY

  // order
  buySell: 'buy' | 'sell';
  price: number;
  quantity: number;
  date: string; // MM-DD-YYYY


```
