import * as DB from '../db';

export interface Trade extends Partial<DB.ITradeDocument> {

}

export interface OptionTrade extends Partial<DB.IOptionTradeDocument> {

}

export interface StockTrade extends Partial<DB.IStockTradeDocument> {

}
