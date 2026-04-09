"use client";
import { getTicker } from "@/utils/httpClient";
import { SignalingManager } from "@/utils/SignalingManager";
import { Ticker } from "@/utils/types";
import { useEffect, useState } from "react";

export const MarketBar = ({ market }: { market: string }) => {
  const [tickerValue, setTickerValue] = useState<Ticker | null>(null);
  // const ws = SignalingManager.getInstance().sendMessage({"method":"UNSUBSCRIBE","params":["ticker.SOL_USDC_PERP"]});
  

  useEffect(() => {
    getTicker(market).then(setTickerValue);
    const manager = SignalingManager.getInstance()
    console.log("Ticker value from market bar component: ", tickerValue)
    manager.registerCallback("ticker",(data : Partial<Ticker>)=>{

      return setTickerValue(prevTicker => ({
        firstPrice: data.firstPrice ?? prevTicker?.firstPrice ?? '',
        high: data.high ?? prevTicker?.high ??'',
        lastPrice: (Number(data.lastPrice)+ Math.random()*10).toFixed(2),
        low: data.low ?? prevTicker?.low ??'',
        priceChange: data.priceChange ?? prevTicker?.priceChange ??'',
        priceChangePercent: data.priceChangePercent ?? prevTicker?.priceChangePercent ??'',
        quoteVolume: data.quoteVolume ?? prevTicker?.quoteVolume ??'',
        symbol: data.symbol ?? prevTicker?.symbol ??'',
        trades: data.trades ?? prevTicker?.trades ??'',
        volume: data.volume ?? prevTicker?.volume ??'',
      }))
    },`ticker-${market}`)

    manager.sendMessage({"method":"SUBSCRIBE","params":[`ticker.${market}`]})

    return () =>{
      manager.deRegisterCallback("ticker", `ticker-${market}`)
      manager.sendMessage({"method":"UNSUBSCRIBE","params":[`ticker.${market}`]})
    }

  }, [market]);

  return (
    <div>
      <div className="flex items-center flex-row relative w-full overflow-hidden border-b border-slate-800">
        <div className="flex items-center justify-between flex-row no-scrollbar overflow-auto pr-4">
          <TickerComponet market={market} />
          <div className="flex items-center flex-row space-x-8 pl-4">
            <div className="flex flex-col h-full justify-center">
              <p
                className={`font-medium tabular-nums text-greenText text-md text-green-500`}
              >
                ${tickerValue?.lastPrice}
              </p>
              <p className="font-medium  text-sm tabular-nums">
                ${tickerValue?.lastPrice}
              </p>
            </div>
            <div className="flex flex-col">
              <p className={`font-medium text-slate-400 text-sm`}>24H Change</p>
              <p
                className={`font-medium tabular-nums leading-5 text-sm text-greenText ${Number(tickerValue?.priceChange) > 0 ? "text-green-500" : "text-red-500"}`}
              >
                {Number(tickerValue?.priceChange) > 0 ? "+" : ""}{" "}
                {tickerValue?.priceChange}{" "}
                {Number(tickerValue?.priceChangePercent)?.toFixed(2)}%
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-medium  text-slate-400 text-sm">24H High</p>
              <p className=" font-medium tabular-nums leading-5 text-sm ">
                {tickerValue?.high}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-medium text-slate-400 text-sm">24H Low</p>
              <p className=" font-medium tabular-nums leading-5 text-sm ">
                {tickerValue?.low}
              </p>
            </div>
            <button
              type="button"
              className="font-medium transition-opacity hover:opacity-80 hover:cursor-pointer text-base text-left"
              data-rac=""
            >
              <div className="flex flex-col">
                <p className="font-medium text-slate-400 text-sm">24H Volume</p>
                <p className="mt-1 font-medium tabular-nums leading-5 text-sm ">
                  {tickerValue?.volume}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function TickerComponet({ market }: { market: string }) {
  return (
    <div className="flex h-15 shrink-0 space-x-4">
      <div className="flex flex-row relative ml-2 -mr-4">
        <img
          alt="SOL Logo"
          loading="lazy"
          decoding="async"
          data-nimg="1"
          className="z-10 rounded-full h-6 w-6 mt-4 outline-baseBackgroundL1"
          src="/sol.webp"
        />
        <img
          alt="USDC Logo"
          loading="lazy"
          decoding="async"
          data-nimg="1"
          className="h-6 w-6 -ml-2 mt-4 rounded-full"
          src="/usdc.webp"
        />
      </div>
      <button type="button" className="react-aria-Button" data-rac="">
        <div className="flex items-center justify-between flex-row cursor-pointer rounded-lg p-3 hover:opacity-80">
          <div className="flex items-center flex-row gap-2 undefined">
            <div className="flex flex-row relative">
              <p className="font-medium text-sm undefined">
                {market.replace("_", " / ")}
              </p>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

export default MarketBar;
