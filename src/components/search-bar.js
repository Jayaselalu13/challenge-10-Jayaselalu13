"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SearchBar;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const lucide_react_1 = require("lucide-react");
const auth_context_1 = require("@/contexts/auth-context");
function SearchBar({ className = "", mobile = false }) {
    const [searchQuery, setSearchQuery] = (0, react_1.useState)("");
    const router = (0, navigation_1.useRouter)();
    const { user } = (0, auth_context_1.useAuth)();
    const handleSearch = (e) => {
        e.preventDefault();
        // Check if user is authenticated
        if (!user) {
            // Redirect to login page if not authenticated
            router.push("/login");
            return;
        }
        // Proceed with search if authenticated and query is not empty
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };
    return (<form onSubmit={handleSearch} className={`rounded-xl border border-[#D5D7DA] h-12 flex items-center px-4 py-3 gap-2 bg-white ${className}`}>
      <button type="submit" className="shrink-0 hover:opacity-70 transition-opacity">
        <lucide_react_1.Search className="w-6 h-6 text-[#717680]"/>
      </button>
      <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 font-inter text-sm leading-7 tracking-[-0.03em] text-[#717680] bg-transparent border-none outline-none placeholder:text-[#717680]"/>
    </form>);
}
