import { Depth, Klines, Ticker, Trade } from "./types";

const BASE_URL = "http://localhost:3000/api/v1";

export async function getDepth(market: string): Promise<Depth> {
  console.log("get depth is called");
  const res = await fetch(`${BASE_URL}/depth?symbol=${market}`);
  const data = await res.json();
  return data;
}

export async function getTrades(market: string): Promise<Trade[]> {
  // const limitValue = limit ? limit : 100
  const res = await fetch(`${BASE_URL}/trades?symbol=${market}`);
  const data = res.json();
  return data;
}

export async function getKlines(
  market: string,
  interval: string,
  startTime: number,
  endTime: number,
): Promise<Klines[]> {
  const res = await fetch(
    `${BASE_URL}/klines?symbol=${market}&interval=${interval}&startTime=${startTime}&endTime=${endTime}`,
  );
  const data: Klines[] = await res.json();
  data.sort((x, y) => new Date(x.end).getTime() - new Date(y.end).getTime());

  return data;
}

export async function getTickers(): Promise<Ticker[]> {
  console.log("get Tickers called");
  const res = await fetch(`${BASE_URL}/tickers`);
  const data = res.json();
  return data;
}

export async function getTicker(market: string): Promise<Ticker> {
  console.log("market", market);
  const tickers: Ticker[] = await getTickers();
  const ticker = tickers.find((t) => t.symbol === market);
  console.log("ticker: ", ticker);
  console.log("ticker");
  if (!ticker) {
    throw new Error(`No ticker found for ${market}`);
  }
  return ticker;
}
