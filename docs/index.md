---
layout: default
title: Home
edited: August 20, 2019
---

# Stocks App

## Models

- Model instance methods do not auto-save (must call `.save()` from controller)

### Portfolio

#### Properties

```
name: string;
holdings: Holding[];
```

#### Static Methods
```
Portfolio.createByName(name: string): Portfolio
```

#### Instance Methods
```
addHoldingToPortfolio: (h: Holding, p: Portfolio) => Portfolio;
fetchHoldingsForPortfolio: (p: Portfolio) => Holding[];
updateHoldingInPortfolio: (h: Holding, p: Portfolio) => Portfolio;
removeHoldingFromPortfolioById: (id: string, p: Portfolio) => Portfolio;
```

### Holding

```
symbol: string;
trades: Trade[];
```

#### Static Methods
```
Holding.findBySymbol(symbol: string): Holding;
```

#### Instance Methods
```
addTradeToHolding: (t: Trade, h: Holding) => Holding
updateTradeInHoldingById: (t: Trade, h: Holding) => Holding
removeTradeFromHoldingById: (id: string, h: Holding) => Holding
```

### Trade

#### Instance Methods
```
addOrderToTrade: (o: Order, t: Trade) => Trade;
updateOrderForTrade: (o: Order, t: Trade) => Trade;
removeOrderForTradeById: (id: string, t: Trade) => Trade;
```


### StockTrade `extends Trade`

```
symbol: string;
orders: Order[];
```

#### Ideas

- add `targetBuy: number`
- add `targetSell: number`
- add `targetEndDate: string`?

### OptionTrade `extends Trade`

```
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

```
date: string;
openClose: 'open' | 'close';
buySell: 'buy' | 'sell';
price: number;
quantity: number;
```

### User

```
username: string;
passwordHash: string;
```

---

## Calculations

```
profitLoss( StockTrade | OptionTrade | Holding | Portfolio )
costBasis( StockTrade | OptionTrade )
calculateTimeRemain ( OptionTrade )
calculateTimeOpen( OptionTrade )
calculateIsClosed( StockTrade | OptionTrade )
calculatePortfolioWeighting( Portfolio )
```

---