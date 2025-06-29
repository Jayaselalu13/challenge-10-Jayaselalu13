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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = AuthProvider;
exports.useAuth = useAuth;
const react_1 = require("react");
const AuthContext = (0, react_1.createContext)(undefined);
function AuthProvider({ children }) {
    const [user, setUser] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        // Clear any existing mock data on startup
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_data");
        setUser(null);
        setLoading(false);
    }, []);
    const login = (email, password) => __awaiter(this, void 0, void 0, function* () {
        try {
            // Simulate API call delay
            yield new Promise((resolve) => setTimeout(resolve, 1000));
            // Mock successful login
            const mockUser = {
                id: "user-123",
                name: "John Doe",
                email: email,
                avatar: "/image-6.png",
            };
            const mockToken = "mock-jwt-token-" + Date.now();
            // Store in localStorage
            localStorage.setItem("auth_token", mockToken);
            localStorage.setItem("user_data", JSON.stringify(mockUser));
            setUser(mockUser);
        }
        catch (error) {
            throw new Error("Login failed");
        }
    });
    const register = (name, email, password) => __awaiter(this, void 0, void 0, function* () {
        try {
            // Simulate API call delay
            yield new Promise((resolve) => setTimeout(resolve, 1000));
            // Mock successful registration
            const mockUser = {
                id: "user-" + Date.now(),
                name: name,
                email: email,
                avatar: "/image-6.png",
            };
            const mockToken = "mock-jwt-token-" + Date.now();
            // Store in localStorage
            localStorage.setItem("auth_token", mockToken);
            localStorage.setItem("user_data", JSON.stringify(mockUser));
            setUser(mockUser);
        }
        catch (error) {
            throw new Error("Registration failed");
        }
    });
    const logout = () => {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_data");
        setUser(null);
    };
    return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>;
}
function useAuth() {
    const context = (0, react_1.useContext)(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
