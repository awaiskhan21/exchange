import { useEffect, useRef, useState } from "react";
import { getKlines } from "../utils/httpClient";
import { Klines } from "@/utils/types";
import { ChartManager } from "@/utils/ChartManager";

export function TradeView({ market }: { market: string }) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartManagerRef = useRef<ChartManager | null>(null);

  const [klineData, setKlineData] = useState<Klines[]>([]);

  const init = async () => {
    try {
      const data = await getKlines(
        market,
        "1h",
        Math.floor((new Date().getTime() - 1000 * 60 * 60 * 24 * 30) / 1000), //30 days data
        Math.floor(new Date().getTime() / 1000),
      );

      setKlineData(data);

      if (chartRef.current) {
        chartManagerRef.current?.destroy();

        const chartManager = new ChartManager(
          chartRef.current,
          data
            .map((x) => ({
              close: parseFloat(x.close),
              high: parseFloat(x.high),
              low: parseFloat(x.low),
              open: parseFloat(x.open),
              timestamp: new Date(x.end),
            }))
            .sort((x, y) => (x.timestamp < y.timestamp ? -1 : 1)) || [],
          {
            background: "#0e0f14",
            color: "white",
          },
        );

        chartManagerRef.current = chartManager;
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    init();
  }, [market, chartRef]);

  return <div ref={chartRef} className="w-full mt-4 h-130" />;
}
