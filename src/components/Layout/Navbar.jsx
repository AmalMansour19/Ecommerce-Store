
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
    Search,
    Heart,
    ShoppingBag,
    UserRound,
    Menu,
    X,
    LogOut,
    ArrowUpRight,
} from "lucide-react";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import storeConfig from "../../config/storeConfig";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [accountOpen, setAccountOpen] = useState(false);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const { wishlist = [] } = useWishlist();
    const { cartCount = 0 } = useCart();
    const { user, logout, isAuthenticated } = useAuth();

    const primary = storeConfig.colors.primary;
    const background = storeConfig.colors.background;

    const closeMenu = () => {
        setIsOpen(false);
        setAccountOpen(false);
    };

    const handleLogout = () => {
        logout();
        closeMenu();
    };

    const isShopActive =
        location.pathname === "/products" &&
        !searchParams.has("category") &&
        !searchParams.has("sort");

    const isSortActive = (sort) =>
        location.pathname === "/products" &&
        searchParams.get("sort") === sort;

    const linkClass = ({ isActive }) =>
        `relative py-2 text-[13px] transition-colors duration-300
     after:absolute after:bottom-0 after:left-0 after:h-px
     after:transition-all after:duration-300 ${isActive
            ? "font-medium text-[#171717] after:w-full"
            : "text-neutral-500 after:w-0 hover:text-[#171717] hover:after:w-full"
        }`;

    const iconLinkClass = (active = false) =>
        `relative flex h-10 w-10 shrink-0 items-center justify-center
     rounded-full transition-colors duration-300 ${active
            ? "bg-white text-[#171717]"
            : "text-[#171717] hover:bg-white"
        }`;

    const mobileLinkClass = (active = false) =>
        `flex min-h-12 items-center justify-between rounded-xl px-4 py-3
     text-sm transition-colors duration-200 ${active
            ? "bg-white font-medium text-[#171717]"
            : "text-neutral-600 hover:bg-white"
        }`;

    const desktopShopClass = (active) =>
        `relative whitespace-nowrap py-2 text-[13px] transition-colors
     after:absolute after:bottom-0 after:left-0 after:h-px
     after:transition-all after:duration-300 ${active
            ? "font-medium text-[#171717] after:w-full"
            : "text-neutral-500 after:w-0 hover:text-[#171717] hover:after:w-full"
        }`;

    return (
        <header
            className="sticky top-0 z-50 border-b border-black/[0.06] backdrop-blur-xl"
            style={{ backgroundColor: `${background}f2` }}
        >
            <nav
                aria-label="Main navigation"
                className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 md:h-20 md:px-10 lg:px-16"
            >
                {/* Logo */}
                <Link
                    to="/"
                    onClick={closeMenu}
                    aria-label={`${storeConfig.name} home`}
                    className="shrink-0 text-[23px] font-semibold tracking-[-0.07em] sm:text-[25px]"
                    style={{ color: primary }}
                >
                    {storeConfig.name}
                    <span className="font-light">.</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-5 xl:flex 2xl:gap-8">
                    <NavLink to="/" end className={linkClass}>
                        Home
                    </NavLink>

                    <Link
                        to="/products"
                        className={desktopShopClass(isShopActive)}
                    >
                        Shop
                    </Link>

                    <Link
                        to="/products?sort=newest"
                        className={desktopShopClass(isSortActive("newest"))}
                    >
                        New Arrivals
                    </Link>

                    <Link
                        to="/products?sort=best-selling"
                        className={desktopShopClass(isSortActive("best-selling"))}
                    >
                        Best Sellers
                    </Link>

                   
                </div>

                {/* Desktop Actions */}
                <div className="hidden shrink-0 items-center gap-1 md:flex">
                    <Link
                        to="/search"
                        aria-label="Search products"
                        title="Search"
                        className={iconLinkClass(location.pathname === "/search")}
                    >
                        <Search size={19} strokeWidth={1.6} />
                    </Link>

                    <Link
                        to="/wishlist"
                        aria-label={`Wishlist, ${wishlist.length} items`}
                        title="Wishlist"
                        className={iconLinkClass(location.pathname === "/wishlist")}
                    >
                        <Heart
                            size={19}
                            strokeWidth={1.6}
                            fill={
                                location.pathname === "/wishlist"
                                    ? "currentColor"
                                    : "none"
                            }
                        />

                        {wishlist.length > 0 && (
                            <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#171717] px-1 text-[9px] font-medium text-white">
                                {wishlist.length > 99 ? "99+" : wishlist.length}
                            </span>
                        )}
                    </Link>

                    {/* Account */}
                    <div className="group relative">
                        {isAuthenticated ? (
                            <>
                                <button
                                    type="button"
                                    aria-label="Account menu"
                                    aria-expanded={accountOpen}
                                    onClick={() => setAccountOpen((prev) => !prev)}
                                    onKeyDown={(event) => {
                                        if (event.key === "Escape") {
                                            setAccountOpen(false);
                                        }
                                    }}
                                    className={iconLinkClass(accountOpen)}
                                >
                                    <UserRound size={19} strokeWidth={1.6} />
                                </button>

                                <div
                                    className={`absolute right-0 top-full w-56 pt-3 transition-all duration-200 ${accountOpen
                                            ? "visible translate-y-0 opacity-100"
                                            : "invisible translate-y-2 opacity-0 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
                                        }`}
                                >
                                    <div className="rounded-2xl border border-black/[0.05] bg-white p-2 shadow-xl shadow-black/[0.06]">
                                        <div className="px-3 py-3">
                                            <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                                                Welcome back
                                            </p>

                                            <p className="mt-1 truncate text-sm font-medium text-[#171717]">
                                                {user?.name || user?.email || "My Account"}
                                            </p>
                                        </div>

                                        <div className="h-px bg-black/[0.06]" />

                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-neutral-600 transition-colors hover:bg-[#f5f3ee] hover:text-[#171717]"
                                        >
                                            <LogOut size={16} />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                aria-label="Login"
                                title="Login"
                                className={iconLinkClass(location.pathname === "/login")}
                            >
                                <UserRound size={19} strokeWidth={1.6} />
                            </Link>
                        )}
                    </div>

                    {/* Shopping Bag */}
                    <Link
                        to="/cart"
                        aria-label={`Shopping bag, ${cartCount} items`}
                        className={`group ml-2 flex h-10 shrink-0 items-center gap-2 rounded-full px-3.5 text-white transition-all duration-300 hover:bg-neutral-800 sm:px-4 ${location.pathname === "/cart"
                                ? "bg-neutral-800"
                                : "bg-[#171717]"
                            }`}
                    >
                        <ShoppingBag
                            size={17}
                            strokeWidth={1.6}
                            className="transition-transform duration-300 group-hover:-rotate-6"
                        />

                        <span className="text-xs font-medium">Bag</span>

                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[9px] font-medium text-[#171717]">
                            {cartCount > 99 ? "99+" : cartCount}
                        </span>
                    </Link>
                </div>

                {/* Mobile Actions */}
                <div className="flex shrink-0 items-center gap-1 md:hidden">
                    <Link
                        to="/search"
                        onClick={closeMenu}
                        aria-label="Search products"
                        className={iconLinkClass(location.pathname === "/search")}
                    >
                        <Search size={19} strokeWidth={1.6} />
                    </Link>

                    <Link
                        to="/cart"
                        onClick={closeMenu}
                        aria-label={`Shopping bag, ${cartCount} items`}
                        className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#171717] transition-colors hover:bg-white"
                    >
                        <ShoppingBag size={19} strokeWidth={1.6} />

                        {cartCount > 0 && (
                            <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#171717] px-1 text-[9px] text-white">
                                {cartCount > 99 ? "99+" : cartCount}
                            </span>
                        )}
                    </Link>

                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={isOpen}
                        className="flex h-10 w-10 items-center justify-center rounded-full text-[#171717] transition-colors hover:bg-white"
                    >
                        {isOpen ? <X size={21} /> : <Menu size={21} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`grid overflow-hidden border-t border-black/[0.05] transition-[grid-template-rows,opacity] duration-300 md:hidden ${isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "pointer-events-none grid-rows-[0fr] opacity-0"
                    }`}
                style={{ backgroundColor: background }}
            >
                <div className="min-h-0 overflow-hidden">
                    <div className="space-y-1 px-4 pb-5 pt-4 sm:px-6">
                        <NavLink
                            to="/"
                            end
                            onClick={closeMenu}
                            className={({ isActive }) => mobileLinkClass(isActive)}
                        >
                            Home
                            <ArrowUpRight size={16} className="text-neutral-400" />
                        </NavLink>

                        <Link
                            to="/products"
                            onClick={closeMenu}
                            className={mobileLinkClass(isShopActive)}
                        >
                            Shop
                            <ArrowUpRight size={16} className="text-neutral-400" />
                        </Link>

                        <Link
                            to="/products?sort=newest"
                            onClick={closeMenu}
                            className={mobileLinkClass(isSortActive("newest"))}
                        >
                            New Arrivals
                            <ArrowUpRight size={16} className="text-neutral-400" />
                        </Link>

                        <Link
                            to="/products?sort=best-selling"
                            onClick={closeMenu}
                            className={mobileLinkClass(isSortActive("best-selling"))}
                        >
                            Best Sellers
                            <ArrowUpRight size={16} className="text-neutral-400" />
                        </Link>

                        
                        <div className="my-3 border-t border-black/[0.07]" />

                        <Link
                            to="/wishlist"
                            onClick={closeMenu}
                            className={mobileLinkClass(location.pathname === "/wishlist")}
                        >
                            <span className="flex items-center gap-3">
                                <Heart size={17} strokeWidth={1.6} />
                                Wishlist
                            </span>

                            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1.5 text-[10px]">
                                {wishlist.length}
                            </span>
                        </Link>

                        <Link
                            to="/search"
                            onClick={closeMenu}
                            className={mobileLinkClass(location.pathname === "/search")}
                        >
                            <span className="flex items-center gap-3">
                                <Search size={17} strokeWidth={1.6} />
                                Search Products
                            </span>
                            <ArrowUpRight size={16} className="text-neutral-400" />
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <div className="mt-3 rounded-xl border border-black/[0.05] bg-white/70 px-4 py-3">
                                    <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                                        Welcome back
                                    </p>
                                    <p className="mt-1 truncate text-sm font-medium text-[#171717]">
                                        {user?.name || user?.email || "My Account"}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex min-h-12 w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-neutral-600 transition-colors hover:bg-white hover:text-[#171717]"
                                >
                                    <LogOut size={17} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                onClick={closeMenu}
                                className={mobileLinkClass(location.pathname === "/login")}
                            >
                                <span className="flex items-center gap-3">
                                    <UserRound size={17} strokeWidth={1.6} />
                                    Login
                                </span>
                                <ArrowUpRight size={16} className="text-neutral-400" />
                            </Link>
                        )}

                        <Link
                            to="/cart"
                            onClick={closeMenu}
                            className="mt-3 flex min-h-12 items-center justify-between rounded-xl bg-[#171717] px-4 py-3 text-sm text-white transition-colors hover:bg-neutral-800"
                        >
                            <span className="flex items-center gap-3">
                                <ShoppingBag size={17} strokeWidth={1.6} />
                                Shopping Bag
                            </span>

                            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1.5 text-[10px] text-[#171717]">
                                {cartCount > 99 ? "99+" : cartCount}
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
