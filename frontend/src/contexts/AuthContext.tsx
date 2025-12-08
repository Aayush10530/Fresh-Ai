import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth } from "@/lib/api";
import { toast } from "sonner";

interface User {
    email: string;
    full_name: string;
    id: number;
    is_superuser: boolean;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (token: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await auth.me();
                setUser(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch user", error);
            localStorage.removeItem("token");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const login = async (token: string) => {
        localStorage.setItem("token", token);
        await fetchUser();
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        toast.success("Logged out successfully");
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
