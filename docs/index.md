---
layout: default
title: Home
edited: August 20, 2019
version: 1
---

# Stocks App

## Models
---

- Model instance methods do not auto-save (must call `.save()` from controller)

### Portfolio

#### Properties

``` ts
name: string;
holdings: Holding[];
```

#### Static Methods

``` ts
static createByName(name: string): Portfolio
```

#### Instance Methods

`addHolding(h: Holding, p: Portfolio) => Portfolio`

- adds the holding to the Portfolio's array
- _does not_ create the holding

`fetchHoldings: (p: Portfolio) => Holding[]`

- if the holdings are strings, fetch them

`removeHolding: (id: string, p: Portfolio) => Portfolio`

- removes the id from the holdings array

### Holding

``` js
  symbol: string;
  trades: (string | Trade)[]; // or string if unpopulated
```

#### Static Methods

```ts
static findBySymbol(symbol: string): Holding;
```

#### Instance Methods

`updateHolding: (h: Holding, p: Portfolio) => Portfolio`
```ts
addTradeToHolding: (t: Trade, h: Holding) => Holding
updateTradeInHoldingById: (t: Trade, h: Holding) => Holding
removeTradeFromHoldingById: (id: string, h: Holding) => Holding
```

### Trade

#### Instance Methods

```ts
addOrderToTrade: (o: Order, t: Trade) => Trade;
updateOrderForTrade: (o: Order, t: Trade) => Trade;
removeOrderForTradeById: (id: string, t: Trade) => Trade;
```

### StockTrade `extends Trade`

```ts
symbol: string;
orders: Order[];
```

#### Ideas

- add `targetBuy: number`
- add `targetSell: number`
- add `targetEndDate: string`?

### OptionTrade `extends Trade`

```ts
symbol: string;
callPut: 'call' | 'put';
strikePrice: number;
expDate: string;
orders: Order[]
```

#### Ideas

- add `targetBuy: number`
- add `targetSell: number`
- add `targetEndDate: string`?

### Orders

```ts
date: string;
openClose: 'open' | 'close';
buySell: 'buy' | 'sell';
price: number;
quantity: number;
```

### User

```ts
username: string;
passwordHash: string;
```

---

## Calculations

```ts
profitLoss( StockTrade | OptionTrade | Holding | Portfolio )
costBasis( StockTrade | OptionTrade )
calculateTimeRemain ( OptionTrade )
calculateTimeOpen( OptionTrade )
calculateIsClosed( StockTrade | OptionTrade )
calculatePortfolioWeighting( Portfolio )
```

---
