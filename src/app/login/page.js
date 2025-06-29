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
exports.default = LoginPage;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const link_1 = __importDefault(require("next/link"));
const lucide_react_1 = require("lucide-react");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
const auth_context_1 = require("@/contexts/auth-context");
const use_toast_1 = require("@/hooks/use-toast");
function LoginPage() {
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const [errors, setErrors] = (0, react_1.useState)({});
    const [loading, setLoading] = (0, react_1.useState)(false);
    const { login } = (0, auth_context_1.useAuth)();
    const router = (0, navigation_1.useRouter)();
    const { toast } = (0, use_toast_1.useToast)();
    const validateForm = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = "Email is required";
        }
        else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid";
        }
        if (!password) {
            newErrors.password = "Password is required";
        }
        else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        if (!validateForm())
            return;
        setLoading(true);
        try {
            yield login(email, password);
            toast({
                title: "Success",
                description: "Logged in successfully!",
            });
            router.push("/");
        }
        catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Login failed",
                variant: "destructive",
            });
        }
        finally {
            setLoading(false);
        }
    });
    return (<div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-[360px] md:max-w-[360px]">
        <div className="shadow-[0px_0px_24px_rgba(205,204,204,0.16)] rounded-xl bg-white border border-gray-100 p-6 space-y-5">
          <h1 className="text-xl font-bold tracking-[-0.03em] leading-[34px] text-gray-800">Sign In</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label_1.Label htmlFor="email" className="text-sm font-semibold tracking-[-0.03em] leading-7 text-gray-600">
                Email
              </label_1.Label>
              <input_1.Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className={`h-12 rounded-xl border px-4 py-2 text-sm tracking-[-0.03em] leading-7 ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"} ${email ? "text-gray-800" : "text-gray-400"}`}/>
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
            </div>

            <div className="space-y-1">
              <label_1.Label htmlFor="password" className="text-sm font-semibold tracking-[-0.03em] leading-7 text-gray-600">
                Password
              </label_1.Label>
              <div className="relative">
                <input_1.Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className={`h-12 rounded-xl border px-4 py-2 pr-12 text-sm tracking-[-0.03em] leading-7 ${errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"} ${password ? "text-gray-800" : "text-gray-400"}`}/>
                <button type="button" className="absolute inset-y-0 right-0 pr-4 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (<lucide_react_1.EyeOff className="h-5 w-5 text-gray-400"/>) : (<lucide_react_1.Eye className="h-5 w-5 text-gray-400"/>)}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
            </div>

            <button_1.Button type="submit" disabled={loading} className="w-full h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm tracking-[-0.03em] leading-7">
              {loading ? "Signing in..." : "Login"}
            </button_1.Button>
          </form>

          <div className="h-7 flex items-center justify-center gap-0.5">
            <span className="text-sm tracking-[-0.03em] leading-7 text-gray-600">Don't have an account?</span>
            <link_1.default href="/register" className="text-sm tracking-[-0.03em] leading-7 font-semibold text-blue-600 hover:text-blue-700">
              Register
            </link_1.default>
          </div>
        </div>
      </div>
    </div>);
}
