---
layout: default
title: Home
---

# Stocks App

## Models

### Portfolio

```
name: string;
holdings: Holding[];
```

### Holding

```
symbol: string;
trades: Trade[];
```

### StockTrade `extends Trade`

```
symbol: string;
orders: Order[];
```

#### Ideas

add `targetBuy: number`
add `targetSell: number`
add `targetEndDate: string`?

### OptionTrade `extends Trade`

```
symbol: string;
callPut: 'call' | 'put';
strikePrice: number;
expDate: string;
orders: Order[]
```

#### Ideas

add `targetBuy: number`
add `targetSell: number`
add `targetEndDate: string`?

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