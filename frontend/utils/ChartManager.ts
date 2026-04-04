import {
  CandlestickSeries,
  ColorType,
  createChart,
  CrosshairMode,
  ISeriesApi,
  UTCTimestamp,
} from "lightweight-charts";
import { Klines } from "./types";

export class ChartManager {
  private candleSeries: ISeriesApi<"Candlestick">;
  private lastUpdateTime: number = 0;
  private chart: any;

  constructor(
    ref: HTMLDivElement,
    initialData: any,
    layout: { background: string; color: string },
  ) {
    const chart = createChart(ref, {
      autoSize: true,
      overlayPriceScales: {
        ticksVisible: true,
        borderVisible: true,
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        visible: true,
        ticksVisible: true,
        entireTextOnly: true,
      },
      grid: {
        horzLines: {
          visible: false,
        },
        vertLines: {
          visible: false,
        },
      },
      layout: {
        background: {
          type: ColorType.Solid,
          color: layout.background,
        },
        textColor: "white",
      },
    });
    this.chart = chart;
    this.candleSeries = chart.addSeries(CandlestickSeries);
    this.candleSeries.setData(
      initialData.map((data: any) => ({
        ...data,
        time: (data.timestamp / 1000) as UTCTimestamp,
      })),
    );
  }

  public destroy() {
    this.chart.remove();
  }
}
