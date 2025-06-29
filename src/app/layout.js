"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
const google_1 = require("next/font/google");
require("./globals.css");
const auth_context_1 = require("@/contexts/auth-context");
const toaster_1 = require("@/components/ui/toaster");
const providers_1 = require("./providers");
const inter = (0, google_1.Inter)({ subsets: ["latin"] });
exports.metadata = {
    title: "Blog Platform",
    description: "A modern blog platform with Next.js",
    generator: 'v0.dev'
};
function RootLayout({ children, }) {
    return (<html lang="en">
      <body className={inter.className}>
        <providers_1.Providers>
        <auth_context_1.AuthProvider>
          {children}
          <toaster_1.Toaster />
        </auth_context_1.AuthProvider>
        </providers_1.Providers>
      </body>
    </html>);
}
