import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    const isInWishlist = (productId) => {
        return wishlist.some((product) => product.id === productId);
    };

    const toggleWishlist = (product) => {
        setWishlist((current) => {
            const exists = current.some(
                (item) => item.id === product.id
            );

            if (exists) {
                return current.filter(
                    (item) => item.id !== product.id
                );
            }

            return [...current, product];
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlist((current) =>
            current.filter((product) => product.id !== productId)
        );
    };

    const clearWishlist = () => {
        setWishlist([]);
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                toggleWishlist,
                removeFromWishlist,
                clearWishlist,
                isInWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    return useContext(WishlistContext);
};