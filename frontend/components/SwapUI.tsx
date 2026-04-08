"use client";

import { useState } from "react";
import Image from "next/image";

export default function SwapUI() {
  const [side, setSide] = useState<"buy" | "sell">("sell");
  const [orderType, setOrderType] = useState<"limit" | "market">("limit");
  const [price, setPrice] = useState("68973.6");
  const [quantity, setQuantity] = useState("");
  const [orderValue, setOrderValue] = useState("");

  return (
    <div className="w-full h-full bg-[#191a20] p-4 shadow-sm">
      {/* Buy Sell Toggle */}
      <div className="relative mb-4 flex h-11 rounded-xl bg-[#202127]">
        <div
          className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg transition-all duration-200 ${
            side === "buy" ? "left-1 bg-[#122322]" : "left-1/2 bg-[#351a1f]"
          }`}
        />

        <button
          onClick={() => setSide("buy")}
          className={`z-10 flex-1 rounded-lg text-sm font-semibold ${
            side === "buy" ? "text-[#00c278]" : "text-gray-400"
          }`}
        >
          Buy / Long
        </button>

        <button
          onClick={() => setSide("sell")}
          className={`z-10 flex-1 rounded-lg text-sm font-semibold ${
            side === "sell" ? "text-red-500" : "text-gray-400"
          }`}
        >
          Sell / Short
        </button>
      </div>

      {/* Order Type */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setOrderType("limit")}
          className={`rounded-lg px-3 py-2 text-sm font-semibold ${
            orderType === "limit" ? "bg-[#202127] text-white" : "text-gray-400"
          }`}
        >
          Limit
        </button>

        <button
          onClick={() => setOrderType("market")}
          className={`rounded-lg px-3 py-2 text-sm font-semibold ${
            orderType === "market" ? "bg-[#202127] text-white" : "text-gray-400"
          }`}
        >
          Market
        </button>
      </div>

      {/* Available Equity */}
      <div className="mb-4 flex justify-between text-xs">
        <span className="text-gray-400">Available Equity</span>
        <span>$0.00</span>
      </div>

      {/* Price */}
      <InputField
        label="Price"
        value={price}
        onChange={setPrice}
        icon="/sol.webp"
      />

      {/* Quantity */}
      <InputField
        label="Quantity"
        value={quantity}
        onChange={setQuantity}
        icon="/sol.webp"
      />

      {/* Slider */}
      <div className="my-4">
        <input type="range" min="0" max="100" className="w-full" />
        <div className="mt-1 flex justify-between text-xs text-gray-400">
          <span>0</span>
          <span>100%</span>
        </div>
      </div>

      {/* Order Value */}
      <InputField
        label="Order Value"
        value={orderValue}
        onChange={setOrderValue}
        icon="/usdc.webp"
      />

      {/* Info */}
      <div className="mt-4 space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-400">Margin Required</span>
          <span>—</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Est. Liquidation Price</span>
          <span>—</span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="mt-5 space-y-2">
        <button className="w-full rounded-xl bg-[#00c278] py-2 font-semibold text-black">
          Sign up to trade
        </button>

        <button className="w-full rounded-xl border border-[#ffffff26] py-2 font-semibold">
          Log in to trade
        </button>
      </div>

      {/* Checkboxes */}
      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
        {["Post Only", "IOC", "Reduce Only", "TP/SL"].map((item) => (
          <label key={item} className="flex items-center gap-2">
            <input type="checkbox" />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: string;
};

function InputField({ label, value, onChange, icon }: InputFieldProps) {
  return (
    <div className="mb-4">
      <p className="mb-1 text-xs text-gray-400">{label}</p>

      <div className="relative">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0"
          className="w-full rounded-lg border border-[#ffffff26] bg-[#202127] p-3 pr-10 text-lg outline-none"
        />

        <Image
          src={icon}
          alt={label}
          width={24}
          height={24}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full"
        />
      </div>
    </div>
  );
}
