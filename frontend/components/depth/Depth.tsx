import { getDepth, getTicker } from "@/utils/httpClient";
import { useEffect, useState } from "react";
import Asks from "./asks";
import Bids from "./bids";
import { SignalingManager } from "@/utils/SignalingManager";
import { Depth as DepthType, Ticker } from "@/utils/types";

function Depth({ market }: { market: string }) {
  const [bids, setBids] = useState<[string, string][]>();
  const [asks, setAsks] = useState<[string, string][]>();
  const [price, setPrice] = useState<string>();

  useEffect(() => {
    const manager = SignalingManager.getInstance();
    getDepth(market).then((d) => {
      setBids(d.bids.slice(0, 15));
      setAsks(d.asks);
    });
    getTicker(market).then((t) => {
      setPrice(t.lastPrice);
    });

    manager.registerCallback(
      "depth",
      (data: Partial<DepthType>) => {
        setBids((originalBids) => {
          const bidMap = new Map(originalBids || []);

          if (!data.bids?.length) return originalBids;

          for (const [price, quantity] of data.bids) {
            if (Number(quantity) === 0) {
              bidMap.delete(price);
            } else {
              bidMap.set(price, quantity);
            }
          }

          return Array.from(bidMap.entries())
            .sort((a, b) => Number(b[0]) - Number(a[0]))
            .slice(0, 15);
        });

        setAsks((originalAsks) => {
          const askMap = new Map(originalAsks || []);

          if (!data.asks?.length) return originalAsks;

          for (const [price, quantity] of data.asks) {
            if (Number(quantity) === 0) {
              askMap.delete(price);
            } else {
              askMap.set(price, quantity);
            }
          }

          return Array.from(askMap.entries())
            .sort((a, b) => Number(a[0]) - Number(b[0]))
            .slice(0, 15);
        });
      },
      `depth-${market}`,
    );

    //ws connection for ticker
    manager.registerCallback(
      "ticker",
      (data: Partial<Ticker>) => {
        return setPrice(
          (Number(data.lastPrice) + Math.random() * 10).toFixed(2),
        );
      },
      `Trade-depth-${market}`,
    );

    manager.sendMessage({ method: "SUBSCRIBE", params: [`ticker.${market}`] });
    manager.sendMessage({
      method: "SUBSCRIBE",
      params: [`depth.200ms.${market}`],
    });

    return () => {
      manager.deRegisterCallback("ticker", `Trade-depth-${market}`);
      manager.deRegisterCallback("depth", `depth-${market}`);
      manager.sendMessage({
        method: "UNSUBSCRIBE",
        params: [`ticker.${market}`],
      });
      manager.sendMessage({
        method: "UNSUBSCRIBE",
        params: [`depth.200ms.${market}`],
      });
    };
  }, [market]);
  return (
    <div className="m-2">
      <TableHeader />
      {asks && <Asks asks={asks} />}
      {price && <div className="text-[#00c278] font-bold">{price}</div>}
      {bids && <Bids bids={bids} />}
    </div>
  );
}

function TableHeader() {
  return (
    <div className="flex justify-between text-xs">
      <div className="text-white">Price</div>
      <div className="text-slate-500">Size</div>
      <div className="text-slate-500">Total</div>
    </div>
  );
}
export default Depth;
