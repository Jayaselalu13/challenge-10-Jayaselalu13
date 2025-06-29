"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Providers = Providers;
const react_1 = require("react");
const react_query_1 = require("@tanstack/react-query");
function Providers({ children }) {
    const [queryClient] = (0, react_1.useState)(() => new react_query_1.QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // 1 minute
                retry: 1, // Only retry once on failure
            },
        },
    }));
    return (<react_query_1.QueryClientProvider client={queryClient}>
      {children}
    </react_query_1.QueryClientProvider>);
}
