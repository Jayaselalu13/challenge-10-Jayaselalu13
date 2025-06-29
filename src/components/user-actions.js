"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserActions;
const link_1 = __importDefault(require("next/link"));
const auth_context_1 = require("@/contexts/auth-context");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const lucide_react_1 = require("lucide-react");
const navigation_1 = require("next/navigation");
function UserActions() {
    const { user, logout } = (0, auth_context_1.useAuth)();
    const router = (0, navigation_1.useRouter)();
    const handleLogout = () => {
        logout();
        router.push("/");
    };
    if (user) {
        return (<div className="flex flex-row items-center justify-start gap-6">
        <link_1.default href="/write" className="flex flex-row items-center justify-start gap-2 text-[#1DA1F2]">
          <lucide_react_1.Edit className="w-6 relative h-6 overflow-hidden shrink-0"/>
          <div className="relative [text-decoration:underline] tracking-[-0.03em] leading-7 font-semibold">
            Write Post
          </div>
        </link_1.default>
        <div className="w-px relative border-[#E5E7EB] border-solid border-r-[1px] box-border h-6"/>
        <dropdown_menu_1.DropdownMenu>
          <dropdown_menu_1.DropdownMenuTrigger asChild>
            <button className="flex flex-row items-center justify-start gap-3 text-[#374151]">
              <img className="w-10 relative rounded-[50%] max-h-full object-cover" alt="" src="/image-6.png"/>
              <div className="relative tracking-[-0.03em] leading-7 font-medium">John Doe</div>
            </button>
          </dropdown_menu_1.DropdownMenuTrigger>
          <dropdown_menu_1.DropdownMenuContent className="w-[184px] rounded-xl bg-white border-[#E5E7EB] border-solid border-[1px] box-border shadow-lg" align="end" sideOffset={8}>
            <dropdown_menu_1.DropdownMenuItem asChild>
              <link_1.default href="/profile" className="flex flex-row items-center justify-start py-3 px-4 gap-2 hover:bg-gray-50 cursor-pointer">
                <lucide_react_1.User className="w-5 relative h-5 overflow-hidden shrink-0"/>
                <span className="relative tracking-[-0.03em] leading-7">Profile</span>
              </link_1.default>
            </dropdown_menu_1.DropdownMenuItem>
            <dropdown_menu_1.DropdownMenuItem onClick={handleLogout} className="flex flex-row items-center justify-start py-3 px-4 gap-2 hover:bg-gray-50 cursor-pointer">
              <lucide_react_1.LogOut className="w-5 relative max-h-full overflow-hidden shrink-0"/>
              <span className="relative tracking-[-0.03em] leading-7">Logout</span>
            </dropdown_menu_1.DropdownMenuItem>
          </dropdown_menu_1.DropdownMenuContent>
        </dropdown_menu_1.DropdownMenu>
      </div>);
    }
    return (<div className="flex flex-row items-center justify-start gap-6">
      <link_1.default href="/login" className="flex flex-row items-center justify-start">
        <div className="relative [text-decoration:underline] tracking-[-0.03em] leading-7 font-semibold text-[#1DA1F2]">
          Login
        </div>
      </link_1.default>
      <div className="w-px relative border-[#E5E7EB] border-solid border-r-[1px] box-border h-6"/>
      <link_1.default href="/register" className="rounded-[9999px] bg-[#1DA1F2] h-11 flex flex-row items-center justify-center px-6 box-border text-white hover:bg-[#1991DB] transition-colors">
        <div className="relative tracking-[-0.03em] leading-7 font-semibold">Register</div>
      </link_1.default>
    </div>);
}
