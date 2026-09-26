import React from "react"

export const PaymentBadge = ({ id, name }: { id: string; name: string }) => {
  switch (id) {
    case "monri":
      return (
        <div className="flex items-center px-1.5 py-1 border border-neutral-200 rounded text-[10px] font-bold text-neutral-800 bg-white shadow-2xs select-none">
          <span className="text-red-500 font-extrabold mr-0.5">m</span>
          <span>monri</span>
        </div>
      )
    case "mastercard":
      return (
        <div className="flex items-center justify-center p-1 bg-white border border-neutral-200 rounded shadow-2xs select-none h-6 w-10">
          <div className="relative flex items-center justify-center">
            <span className="size-3.5 rounded-full bg-[#EB001B] inline-block opacity-90" />
            <span className="size-3.5 rounded-full bg-[#F79E1B] inline-block -ml-1.5 opacity-90" />
          </div>
        </div>
      )
    case "maestro":
      return (
        <div className="flex items-center justify-center p-1 bg-white border border-neutral-200 rounded shadow-2xs select-none h-6 w-10">
          <div className="relative flex items-center justify-center">
            <span className="size-3.5 rounded-full bg-[#EB001B] inline-block opacity-90" />
            <span className="size-3.5 rounded-full bg-[#0061A8] inline-block -ml-1.5 opacity-90" />
          </div>
        </div>
      )
    case "visa":
      return (
        <div className="flex items-center justify-center px-1.5 py-0.5 bg-white border border-neutral-200 rounded shadow-2xs select-none h-6">
          <span className="text-[#1A1F71] font-black italic text-xs tracking-wider">VISA</span>
        </div>
      )
    case "mastercard-securecode":
      return (
        <div className="flex flex-col items-center justify-center px-1 py-0.5 bg-white border border-neutral-200 rounded shadow-2xs select-none h-6 leading-none">
          <span className="text-[7px] font-bold text-[#EB001B]">Mastercard.</span>
          <span className="text-[6px] font-semibold text-neutral-600">SecureCode.</span>
        </div>
      )
    case "verified-by-visa":
      return (
        <div className="flex flex-col items-center justify-center px-1.5 py-0.5 bg-white border border-neutral-200 rounded shadow-2xs select-none h-6 leading-none">
          <span className="text-[6px] font-semibold text-neutral-600">Verified by</span>
          <span className="text-[8px] font-black italic text-[#1A1F71]">VISA</span>
        </div>
      )
    case "diners":
      return (
        <div className="flex items-center justify-center px-1.5 py-0.5 bg-white border border-neutral-200 rounded shadow-2xs select-none h-6">
          <div className="size-3 rounded-full border border-[#0061A8] flex items-center justify-center mr-1">
            <span className="size-1.5 rounded-full bg-[#0061A8]" />
          </div>
          <span className="text-[7px] font-bold text-[#0061A8]">Diners Club</span>
        </div>
      )
    case "discover":
      return (
        <div className="flex items-center justify-center px-1.5 py-0.5 bg-white border border-neutral-200 rounded shadow-2xs select-none h-6">
          <span className="text-[8px] font-black text-neutral-800 tracking-tight">
            DISC<span className="text-[#FF6600]">O</span>VER
          </span>
        </div>
      )
    default:
      return (
        <div className="flex items-center justify-center px-2 py-0.5 bg-white border border-neutral-200 rounded text-[9px] font-semibold text-neutral-700 select-none h-6">
          {name}
        </div>
      )
  }
}
