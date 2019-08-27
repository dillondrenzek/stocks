---
layout: default
title: Home
edited: August 22, 2019
version: 2
---

# Stocks App

## Models

- Model instance methods do not auto-save (must call `.save()` from controller)
  - I'm not sure about this

---

### Portfolio

#### Properties

- `name: string;`
- `holdings: { [symbol: string]: Holding }`

#### Static Methods

`static createByName(name: string): Portfolio`

- creates and saves a new Portfolio with a given name

#### Instance Methods

`addHolding`

- `(h: Holding, p: Portfolio) => Portfolio`
- adds the holding to the Portfolio's array

`updateHolding(h: Holding, p: Portfolio) => Portfolio`

- updates the holding in the Portfolio

`removeHolding(h: Holding, p: Portfolio) => Portfolio`

- removes the holding from the Portfolio

`addTransaction(t: Transaction, p: Portfolio) => Portfolio`

- adds the transaction to the portfolio's respective holding

`removeTransaction(t: string | Transaction, p: Portfolio) => Portfolio`

- removes the transaction from the portfolio
- removes the id if a string is passed in
- should also delete the transaction in the process

### Holding

- `symbol: string;`
- `trades: string[] | Transaction[];` (string if unfetched)

---

### Transaction

- `type: 'stock' | 'option'`

(Holding Details)

- `symbol: string`

(Option Details)

- `callPut: 'call' | 'put'`
- `strikePrice: number`
- `expirationDate: string`

(Order Details)

- `date: string` MM-DD-YYYY (?)
- `buySell: 'buy' | 'sell'`
- `price: number`
- `quantity: number`

#### Ideas

- add `targetBuy: number`
- add `targetSell: number`
- add `targetEndDate: string`?

---

### User

```ts
username: string;
passwordHash: string;
```

---

## Calculations

```ts
profitLoss( Holding | Portfolio )
costBasis( Transaction[] )
calculateTimeRemain ( OptionTrade )
calculateTimeOpen( OptionTrade )
calculateIsClosed( StockTrade | OptionTrade )
calculatePortfolioWeighting( Portfolio )
```

---
