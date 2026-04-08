import { getDepth, getTicker } from "@/utils/httpClient";
import { useEffect, useState } from "react";
import Asks from "./asks";
import Bids from "./bids";

function Depth({ market }: { market: string }) {
  const [bids, setBids] = useState<[string, string][]>();
  const [asks, setAsks] = useState<[string, string][]>();
  const [price, setPrice] = useState<string>();

  useEffect(() => {
    getDepth(market).then((d) => {
      setBids(d.bids);
      setAsks(d.asks);
    });
    getTicker(market).then((t) => {
      setPrice(t.lastPrice);
    });
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
