export interface Depth {
  bids: [string, string][];
  asks: [string, string][];
  lastUpdatedId: number;
}

export interface Klines {
  open: string;
  close: string;
  high: string;
  low: string;
  quoteVolume: string; //volume of quote asset
  start: Date;
  end: Date;
  trades: string;
  volume: string; // volume of base asset
}

export interface Trade {
  id: number;
  isBuyerMaker: boolean; //if buye is waiting in order book for seller then true
  //eg [buy: $100, sell:$101] then user come => sell 5@market in this case user was
  //waiting in order book so this field will be true
  price: string;
  quantity: string;
  quoteQuantity: string;
  timestamp: number;
}

export interface Ticker {
  firstPrice: string;
  high: string;
  lastPrice: string;
  low: string;
  priceChange: string;
  priceChangePercent: string;
  quoteVolume: string;
  symbol: string;
  trades: string;
  volume: string;
}
export interface CallbackMap {
  ticker: (data: Partial<Ticker>) => void;
  depth: (data: any) => void; // you can refine later
}
