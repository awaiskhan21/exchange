"use client";

import Depth from "@/components/depth/Depth";
import MarketBar from "@/components/MarketBar";
import SwapUI from "@/components/SwapUI";
import { TradeView } from "@/components/TradeView";
import { useParams } from "next/navigation";

function page() {
  const { market } = useParams();

  return (
    <div className="bg-[#0e0f14] text-high-emphasis flex flex-1 flex-col justify-between overflow-x-hidden overflow-y-auto h-full">
      <div className="flex flex-row flex-1">
        <div className="flex flex-col flex-1">
          <MarketBar market={market as string} />
          <div className="flex flex-row h-[620px] border-y border-slate-800">
            <div className="flex flex-col flex-1">
              <TradeView market={market as string} />
            </div>
            <div className="w-[1px] flex-col border-slate-800 border-l"></div>
            <div className="flex flex-col w-[250px] overflow-hidden m-7">
              {/* <Depth market={market as string} />  */}
              <Depth market={market as string} />
            </div>
          </div>
        </div>
        <div className="w-[1px] flex-col border-slate-800 border-2"></div>
        <div className="h-full">
          <div className="flex flex-col w-auto h-full">
            {/* <SwapUI market={market as string} /> */}
            <SwapUI />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
