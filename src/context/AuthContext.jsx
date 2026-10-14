
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const AuthContext = createContext(null);

const readStorage = (key, fallback) => {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
    } catch {
        return fallback;
    }
};

const getPublicUser = (user) => {
    if (!user) return null;

    const { password, ...publicUser } = user;
    return publicUser;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() =>
        getPublicUser(readStorage("user", null))
    );

    useEffect(() => {
        try {
            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
            } else {
                localStorage.removeItem("user");
            }
        } catch {
            // Browser storage may be unavailable.
        }
    }, [user]);

    const login = (email, password) => {
        const users = readStorage("users", []);

        if (!Array.isArray(users)) {
            return {
                success: false,
                message: "Unable to load accounts. Please try again.",
            };
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = users.find(
            (item) =>
                item.email?.trim().toLowerCase() === normalizedEmail &&
                item.password === password
        );

        if (!existingUser) {
            return {
                success: false,
                message: "Invalid email or password.",
            };
        }

        const publicUser = getPublicUser(existingUser);
        setUser(publicUser);

        return {
            success: true,
            user: publicUser,
        };
    };

    const register = (userData) => {
        const users = readStorage("users", []);

        if (!Array.isArray(users)) {
            return {
                success: false,
                message: "Unable to load accounts. Please try again.",
            };
        }

        const normalizedEmail = userData.email.trim().toLowerCase();

        const existingUser = users.find(
            (item) =>
                item.email?.trim().toLowerCase() === normalizedEmail
        );

        if (existingUser) {
            return {
                success: false,
                message: "An account with this email already exists.",
            };
        }

        const newUser = {
            id: Date.now(),
            name: userData.name.trim(),
            email: normalizedEmail,
            password: userData.password,
        };

        try {
            localStorage.setItem(
                "users",
                JSON.stringify([...users, newUser])
            );
        } catch {
            return {
                success: false,
                message: "Could not save your account. Please try again.",
            };
        }

        const publicUser = getPublicUser(newUser);
        setUser(publicUser);

        return {
            success: true,
            user: publicUser,
        };
    };

    const logout = () => {
        setUser(null);
    };

    const isAuthenticated = Boolean(user);

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout,
                isAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside an AuthProvider.");
    }

    return context;
};
