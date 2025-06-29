"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Logo;
const link_1 = __importDefault(require("next/link"));
function Logo({ mobile = false }) {
    if (mobile) {
        return (<link_1.default href="/" className="flex flex-row items-center justify-start gap-[6.4px] text-base text-gray font-outfit hover:opacity-80 transition-opacity cursor-pointer">
        <img className="w-[19.7px] relative h-[21.6px] object-cover" alt="" src="/logo-symbol.png"/>
        <div className="relative leading-6 font-semibold">Your Logo</div>
      </link_1.default>);
    }
    return (<link_1.default href="/" className="flex flex-row items-center justify-start gap-[9.6px] text-2xl text-gray font-outfit hover:opacity-80 transition-opacity cursor-pointer">
      <img className="w-[29.6px] relative h-[32.5px] object-cover" alt="" src="/logo-symbol.png"/>
      <div className="relative leading-9 font-semibold">Your Logo</div>
    </link_1.default>);
}
