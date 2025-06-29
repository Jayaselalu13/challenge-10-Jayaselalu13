"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Header;
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const lucide_react_1 = require("lucide-react");
const button_1 = require("@/components/ui/button");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const avatar_1 = require("@/components/ui/avatar");
const auth_context_1 = require("@/contexts/auth-context");
const use_toast_1 = require("@/hooks/use-toast");
const search_bar_1 = __importDefault(require("@/components/search-bar"));
function Header() {
    const { user, logout } = (0, auth_context_1.useAuth)();
    const router = (0, navigation_1.useRouter)();
    const { toast } = (0, use_toast_1.useToast)();
    const handleLogout = () => {
        logout();
        toast({
            title: "Success",
            description: "Logged out successfully!",
        });
        router.push("/");
    };
    return (<>
      {/* Desktop Header */}
      <header className="hidden md:block fixed top-0 left-0 right-0 bg-white border-b border-[#D5D7DA] h-20 z-50">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-0 h-full flex items-center justify-between gap-4">
          {/* Logo */}
          <link_1.default href="/" className="flex items-center gap-[9.6px] font-outfit shrink-0 min-w-0 hover:opacity-80 transition-opacity cursor-pointer">
            <img src="/logo-symbol.png" alt="Logo Symbol" className="w-[29.6px] h-[32.5px] object-cover shrink-0"/>
            <div className="text-xl lg:text-2xl font-semibold text-[#0A0D12] leading-9 whitespace-nowrap">
              Your Logo
            </div>
          </link_1.default>

          {/* Search Bar */}
          <search_bar_1.default className="w-full max-w-[373px] min-w-[150px] mx-2 lg:mx-4"/>

          {/* User Actions */}
          <div className="flex items-center gap-3 lg:gap-6 text-[#0093DD] shrink-0">
            {user ? (<>
                {/* Write Post Link */}
                <link_1.default href="/write" className="flex items-center gap-2">
                  <lucide_react_1.PenLine className="w-4 h-4 text-[#0093DD]"/>
                  <div className="text-sm leading-7 tracking-[-0.03em] font-semibold text-[#0093DD] whitespace-nowrap">
                    Write Post
                  </div>
                </link_1.default>

                {/* User Profile */}
                <dropdown_menu_1.DropdownMenu>
                  <dropdown_menu_1.DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                      <avatar_1.Avatar className="w-8 h-8">
                        <avatar_1.AvatarImage src={user.avatar || "/placeholder-user.jpg"} alt={user.name}/>
                        <avatar_1.AvatarFallback className="bg-[#0093DD] text-white text-sm">
                          {user.name.charAt(0)}
                        </avatar_1.AvatarFallback>
                      </avatar_1.Avatar>
                      <div className="text-sm leading-7 tracking-[-0.03em] font-semibold text-[#0A0D12] whitespace-nowrap">
                        {user.name}
                      </div>
                    </button>
                  </dropdown_menu_1.DropdownMenuTrigger>
                  <dropdown_menu_1.DropdownMenuContent align="end" className="w-56">
                    <dropdown_menu_1.DropdownMenuItem asChild>
                      <link_1.default href="/profile" className="flex items-center space-x-2">
                        <lucide_react_1.User className="w-4 h-4"/>
                        <span>Profile</span>
                      </link_1.default>
                    </dropdown_menu_1.DropdownMenuItem>
                    <dropdown_menu_1.DropdownMenuItem asChild>
                      <link_1.default href="/settings" className="flex items-center space-x-2">
                        <lucide_react_1.Settings className="w-4 h-4"/>
                        <span>Settings</span>
                      </link_1.default>
                    </dropdown_menu_1.DropdownMenuItem>
                    <dropdown_menu_1.DropdownMenuSeparator />
                    <dropdown_menu_1.DropdownMenuItem onClick={handleLogout} className="flex items-center space-x-2 text-red-600 focus:text-red-600">
                      <lucide_react_1.LogOut className="w-4 h-4"/>
                      <span>Logout</span>
                    </dropdown_menu_1.DropdownMenuItem>
                  </dropdown_menu_1.DropdownMenuContent>
                </dropdown_menu_1.DropdownMenu>
              </>) : (<>
                {/* Login Link */}
                <link_1.default href="/login" className="flex items-center">
                  <div className="text-sm leading-7 tracking-[-0.03em] font-semibold underline whitespace-nowrap">
                    Login
                  </div>
                </link_1.default>

                {/* Divider */}
                <div className="w-px bg-[#9CA3AF] h-6 shrink-0"/>

                {/* Register Button */}
                <link_1.default href="/register">
                  <button className="w-[140px] lg:w-[182px] rounded-full bg-[#0093DD] h-11 flex justify-center items-center px-2">
                    <div className="text-sm leading-7 tracking-[-0.03em] font-semibold text-white whitespace-nowrap">
                      Register
                    </div>
                  </button>
                </link_1.default>
              </>)}
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b border-[#D5D7DA] sticky top-0 z-50">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <link_1.default href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
            <img src="/logo-symbol.png" alt="Logo" className="w-6 h-6"/>
            <span className="text-lg font-semibold text-[#0A0D12] font-outfit">Your Logo</span>
          </link_1.default>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {user ? (<>
                <link_1.default href="/write">
                  <button_1.Button variant="ghost" size="sm" className="text-[#0093DD] flex items-center gap-1">
                    <lucide_react_1.PenLine className="w-4 h-4"/>
                    Write Post
                  </button_1.Button>
                </link_1.default>
                <dropdown_menu_1.DropdownMenu>
                  <dropdown_menu_1.DropdownMenuTrigger asChild>
                    <button_1.Button variant="ghost" size="sm" className="p-1">
                      <avatar_1.Avatar className="w-8 h-8">
                        <avatar_1.AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name}/>
                        <avatar_1.AvatarFallback>{user.name.charAt(0)}</avatar_1.AvatarFallback>
                      </avatar_1.Avatar>
                    </button_1.Button>
                  </dropdown_menu_1.DropdownMenuTrigger>
                  <dropdown_menu_1.DropdownMenuContent align="end" className="w-56">
                    <dropdown_menu_1.DropdownMenuItem asChild>
                      <link_1.default href="/profile" className="flex items-center space-x-2">
                        <lucide_react_1.User className="w-4 h-4"/>
                        <span>Profile</span>
                      </link_1.default>
                    </dropdown_menu_1.DropdownMenuItem>
                    <dropdown_menu_1.DropdownMenuItem asChild>
                      <link_1.default href="/settings" className="flex items-center space-x-2">
                        <lucide_react_1.Settings className="w-4 h-4"/>
                        <span>Settings</span>
                      </link_1.default>
                    </dropdown_menu_1.DropdownMenuItem>
                    <dropdown_menu_1.DropdownMenuSeparator />
                    <dropdown_menu_1.DropdownMenuItem onClick={handleLogout} className="flex items-center space-x-2 text-red-600 focus:text-red-600">
                      <lucide_react_1.LogOut className="w-4 h-4"/>
                      <span>Logout</span>
                    </dropdown_menu_1.DropdownMenuItem>
                  </dropdown_menu_1.DropdownMenuContent>
                </dropdown_menu_1.DropdownMenu>
              </>) : (<>
                <link_1.default href="/login">
                  <button_1.Button variant="ghost" size="sm" className="text-[#0093DD]">
                    Login
                  </button_1.Button>
                </link_1.default>
                <link_1.default href="/register">
                  <button_1.Button size="sm" className="bg-[#0093DD] hover:bg-blue-600 text-white">
                    Register
                  </button_1.Button>
                </link_1.default>
              </>)}
          </div>
        </div>
      </header>
    </>);
}
