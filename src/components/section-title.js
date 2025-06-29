"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SectionTitle;
function SectionTitle({ children, variant = "main" }) {
    if (variant === "sidebar") {
        return (<h2 className="relative text-2xl tracking-[-0.03em] leading-9 font-inter text-[#374151] text-left font-bold">
        {children}
      </h2>);
    }
    return (<h1 className="w-full relative text-[28px] tracking-[-0.03em] leading-[38px] inline-block font-inter text-[#374151] text-left font-bold">
      {children}
    </h1>);
}
