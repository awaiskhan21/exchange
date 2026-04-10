import { Ticker, CallbackMap, Depth } from "./types";

const BASE_URL = "wss://ws.backpack.exchange/";

export class SignalingManager {
  private ws: WebSocket;
  private static instance: SignalingManager;
  private bufferMessages: any[];
  private callbacks: {
    [k in keyof CallbackMap]?: { callback: CallbackMap[k]; id: string }[];
  } = {};
  private initialized: boolean = false;
  private id: number;

  // {"method":"UNSUBSCRIBE","params":["ticker.SOL_USDC_PERP"],"id":16}
  // {"method":"UNSUBSCRIBE","params":["depth.200ms.SOL_USDC_PERP"],"id":14}
  // {"method":"UNSUBSCRIBE","params":["trade.SOL_USDC_PERP"],"id":13}
  // {"method":"UNSUBSCRIBE","params":["kline.1m.SOL_USDC"],"id":15}
  private constructor() {
    console.log("constructor is called");
    this.ws = new WebSocket(BASE_URL);
    this.bufferMessages = [];
    this.id = 1;
    this.init();
  }

  public static getInstance() {
    console.log("SignalingManager>getInstance called");
    if (!this.instance) {
      this.instance = new SignalingManager();
    }
    return this.instance;
  }

  init() {
    console.log("SignalingManager>init called");

    //when connection open set initialized to true and send all the buffer msgs
    this.ws.onopen = () => {
      console.log("SignalingManager>init>onopen called");
      this.initialized = true;
      this.bufferMessages.forEach((message) => {
        this.ws.send(JSON.stringify(message));
      });
      this.bufferMessages = [];
    };

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // console.log("SignalingManager>init>onopen called");
      const type = message.data.e as keyof CallbackMap;

      if (this.callbacks[type]) {
        this.callbacks[type]!.forEach((callbackObj) => {
          if (type === "ticker") {
            const newTicker: Partial<Ticker> = {
              lastPrice: message.data.c,
              firstPrice: message.data.o,
              high: message.data.h,
              low: message.data.l,
              volume: message.data.v,
              quoteVolume: message.data.V,
              symbol: message.data.s,
            };
            callbackObj.callback(newTicker);
          } else if (type === "depth") {
            const updatedBids = message.data.b;
            const updatedAsks = message.data.a;
            callbackObj.callback({ bids: updatedBids, asks: updatedAsks });
          }
        });
      }
    };
  }

  sendMessage(message: any) {
    const messageToSend = { ...message, id: this.id++ };
    if (!this.initialized) {
      this.bufferMessages.push(messageToSend);
      return;
    }
    // console.log(
    //   "SignalingManager>sendMessage called:message=>, ",
    //   messageToSend,
    // );

    this.ws.send(JSON.stringify(messageToSend));
  }

  // Register a callback function for a specific websocket event type.
  // Whenever a message is received from the websocket, we check its type
  // (for example: "ticker" or "depth") and invoke all callbacks
  // registered for that type by passing the parsed message data.
  //
  // Example:
  // if message type = "ticker"
  // -> callback(message.data)
  //
  // Stored structure example:
  // this.callbacks = {
  //   ticker: [
  //     { callback: fn1, id: "123" },
  //     { callback: fn2, id: "456" }
  //   ]
  // }
  async registerCallback(type: keyof CallbackMap, callback: any, id: string) {
    this.callbacks[type] = this.callbacks[type] || [];
    this.callbacks[type]!.push({ callback, id });
  }

  async deRegisterCallback(type: keyof CallbackMap, id: string) {
    if (this.callbacks[type]) {
      const index = this.callbacks[type]!.findIndex(
        (callbackElement) => callbackElement.id === id,
      );
      if (index != -1) {
        this.callbacks[type]!.splice(index, 1);
      }
    }
  }
}
