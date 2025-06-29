"use strict";
"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TestLoginPage;
const react_1 = require("react");
const auth_context_1 = require("@/contexts/auth-context");
const button_1 = require("@/components/ui/button");
const header_1 = __importDefault(require("@/components/header"));
function TestLoginPage() {
    const { user, login, logout } = (0, auth_context_1.useAuth)();
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const handleTestLogin = () => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        try {
            // Simulate login with test credentials
            yield login("test@example.com", "password123");
        }
        catch (error) {
            console.error("Login failed:", error);
        }
        finally {
            setIsLoading(false);
        }
    });
    const handleTestLogout = () => {
        logout();
    };
    return (<div className="min-h-screen bg-gray-50">
      <header_1.default />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Test Login Functionality</h1>

          <div className="space-y-6">
            <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">Current Authentication State</h2>
              {user ? (<div className="space-y-3">
                  <p className="text-green-700 font-medium">✅ User is logged in</p>
                  <div className="bg-white p-4 rounded border">
                    <p>
                      <strong>Name:</strong> {user.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                      <strong>ID:</strong> {user.id}
                    </p>
                  </div>
                  <p className="text-sm text-blue-700">
                    🔍 <strong>Header should show:</strong> "Write Post" link + User profile dropdown with avatar
                  </p>
                </div>) : (<div className="space-y-3">
                  <p className="text-red-700 font-medium">❌ User is not logged in</p>
                  <p className="text-sm text-blue-700">
                    🔍 <strong>Header should show:</strong> "Login" link + "Register" button (desktop) | Search + Menu
                    icons (mobile)
                  </p>
                </div>)}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Desktop Header States</h3>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-white rounded border">
                    <strong>Before Login:</strong>
                    <ul className="mt-2 space-y-1 text-gray-600">
                      <li>• Logo on left</li>
                      <li>• Search bar in center</li>
                      <li>• "Login" link (blue, underlined)</li>
                      <li>• "Register" button (blue, rounded)</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white rounded border">
                    <strong>After Login:</strong>
                    <ul className="mt-2 space-y-1 text-gray-600">
                      <li>• Logo on left</li>
                      <li>• Search bar in center</li>
                      <li>• "Write Post" link with edit icon</li>
                      <li>• User avatar + name dropdown</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Mobile Header States</h3>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-white rounded border">
                    <strong>Before Login:</strong>
                    <ul className="mt-2 space-y-1 text-gray-600">
                      <li>• Logo on left</li>
                      <li>• Search icon on right</li>
                      <li>• Hamburger menu icon</li>
                      <li>• Menu overlay with Login/Register</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white rounded border">
                    <strong>After Login:</strong>
                    <ul className="mt-2 space-y-1 text-gray-600">
                      <li>• Logo on left</li>
                      <li>• User avatar on right</li>
                      <li>• Profile dropdown menu</li>
                      <li>• No hamburger menu</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              {user ? (<button_1.Button onClick={handleTestLogout} variant="outline" className="flex-1">
                  🚪 Test Logout (Switch to Before-Login State)
                </button_1.Button>) : (<button_1.Button onClick={handleTestLogin} disabled={isLoading} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  {isLoading ? "Logging in..." : "🔑 Test Login (Switch to After-Login State)"}
                </button_1.Button>)}
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">🧪 Testing Instructions:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-700">
                <li>Click the test login/logout button above</li>
                <li>Watch the header transform in real-time</li>
                <li>Test on both desktop and mobile views</li>
                <li>Try the dropdown menus and navigation</li>
                <li>Verify responsive behavior</li>
              </ol>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">✅ Expected Behavior:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
                <li>Smooth transition between login states</li>
                <li>Proper conditional rendering of UI elements</li>
                <li>Responsive design on all screen sizes</li>
                <li>Working dropdown menus and navigation</li>
                <li>Consistent styling with Figma designs</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>);
}
