
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
    Search,
    SlidersHorizontal,
    ChevronDown,
    Heart,
    ArrowUpRight,
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { useWishlist } from "../../context/WishlistContext";
import products from "../../data/product.js";
import storeConfig from "../../config/storeConfig";
import formatPrice from "../../config/formatPrice";

const ALL_CATEGORY = "All";

const categories = [ALL_CATEGORY, ...storeConfig.categories];

const VALID_SORT_OPTIONS = [
    "best-selling",
    "price-low",
    "price-high",
    "name",
];

const Products = () => {
    const PRODUCTS_PER_PAGE = storeConfig.productsPerPage || 8;

    const [searchParams, setSearchParams] = useSearchParams();

    const categoryFromUrl = searchParams.get("category");
    const sortFromUrl = searchParams.get("sort");

    const initialCategory = categories.includes(categoryFromUrl)
        ? categoryFromUrl
        : ALL_CATEGORY;

    const initialSort = VALID_SORT_OPTIONS.includes(sortFromUrl)
        ? sortFromUrl
        : "default";

    const [selectedCategory, setSelectedCategory] =
        useState(initialCategory);

    const [search, setSearch] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [inStockOnly, setInStockOnly] = useState(false);
    const [sortBy, setSortBy] = useState(initialSort);
    const [currentPage, setCurrentPage] = useState(1);

    const { toggleWishlist, isInWishlist } = useWishlist();

    const invalidPriceRange =
        minPrice !== "" &&
        maxPrice !== "" &&
        Number(minPrice) > Number(maxPrice);

    // Sync category and sorting with URL parameters.
    useEffect(() => {
        const category = searchParams.get("category");
        const sort = searchParams.get("sort");

        setSelectedCategory(
            categories.includes(category) ? category : ALL_CATEGORY
        );

        setSortBy(
            VALID_SORT_OPTIONS.includes(sort) ? sort : "default"
        );
    }, [searchParams]);

    // Filter and sort products.
    const filteredProducts = useMemo(() => {
        if (invalidPriceRange) {
            return [];
        }

        const result = products.filter((product) => {
            const matchesCategory =
                selectedCategory === ALL_CATEGORY ||
                product.category === selectedCategory;

            const matchesSearch = product.name
                .toLowerCase()
                .includes(search.trim().toLowerCase());

            const matchesMinPrice =
                minPrice === "" ||
                product.price >= Number(minPrice);

            const matchesMaxPrice =
                maxPrice === "" ||
                product.price <= Number(maxPrice);

            const matchesStock =
                !inStockOnly || product.stock > 0;

            return (
                matchesCategory &&
                matchesSearch &&
                matchesMinPrice &&
                matchesMaxPrice &&
                matchesStock
            );
        });

        // Sort a new filtered array without mutating the source data.
        if (sortBy === "price-low") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-high") {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === "name") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "best-selling") {
            // Approximation: actual sales data is not available.
            result.sort(
                (a, b) =>
                    b.reviews - a.reviews ||
                    b.rating - a.rating
            );
        }

        return result;
    }, [
        selectedCategory,
        search,
        minPrice,
        maxPrice,
        inStockOnly,
        sortBy,
        invalidPriceRange,
    ]);

    // Reset pagination when filters change.
    useEffect(() => {
        setCurrentPage(1);
    }, [
        selectedCategory,
        search,
        minPrice,
        maxPrice,
        inStockOnly,
        sortBy,
    ]);

    const totalPages = Math.ceil(
        filteredProducts.length / PRODUCTS_PER_PAGE
    );

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(Math.max(1, totalPages));
        }
    }, [currentPage, totalPages]);

    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

    const currentProducts = filteredProducts.slice(
        startIndex,
        startIndex + PRODUCTS_PER_PAGE
    );

    const pageNumbers = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    );

    const updateCategory = (category) => {
        setSelectedCategory(category);

        const nextParams = new URLSearchParams(searchParams);

        if (category === ALL_CATEGORY) {
            nextParams.delete("category");
        } else {
            nextParams.set("category", category);
        }

        setSearchParams(nextParams);
    };

    const updateSort = (value) => {
        setSortBy(value);

        const nextParams = new URLSearchParams(searchParams);

        if (value === "default") {
            nextParams.delete("sort");
        } else {
            nextParams.set("sort", value);
        }

        setSearchParams(nextParams);
    };

    const clearFilters = () => {
        setSearch("");
        setSelectedCategory(ALL_CATEGORY);
        setMinPrice("");
        setMaxPrice("");
        setInStockOnly(false);
        setSortBy("default");
        setCurrentPage(1);
        setSearchParams({});
    };

    const hasActiveFilters =
        search.trim() !== "" ||
        selectedCategory !== ALL_CATEGORY ||
        minPrice !== "" ||
        maxPrice !== "" ||
        inStockOnly ||
        sortBy !== "default";

    return (
        <main
            className="min-h-screen px-5 py-10 sm:px-8 md:px-10 lg:px-16"
            style={{
                backgroundColor: storeConfig.colors.background,
                color: storeConfig.colors.text,
            }}
        >
            <div className="mx-auto max-w-7xl">
                {/* Page heading */}
                <div className="mb-12 sm:mb-14">
                    <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">
                        {storeConfig.name} / Collection
                    </p>

                    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                        <h1 className="text-5xl font-semibold tracking-[-0.06em] md:text-7xl">
                            Shop
                            <span className="font-light italic">
                                {" "}everything.
                            </span>
                        </h1>

                        <p className="max-w-sm text-sm leading-6 text-neutral-500">
                            {storeConfig.tagline}
                        </p>
                    </div>
                </div>

                {/* Categories, search and sort */}
                <div className="mb-8 flex flex-col gap-5 border-y border-black/10 py-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                onClick={() => updateCategory(category)}
                                aria-pressed={selectedCategory === category}
                                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-xs font-medium transition-all duration-300 ${selectedCategory === category
                                        ? "bg-[#171717] text-white"
                                        : "bg-white text-neutral-500 hover:text-[#171717]"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative flex min-w-0 flex-1 items-center lg:w-64 lg:flex-none">
                            <Search
                                size={17}
                                className="absolute left-4 text-neutral-400"
                            />

                            <input
                                type="search"
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Search products..."
                                aria-label="Search products"
                                className="h-11 w-full rounded-full border border-black/10 bg-white pl-11 pr-10 text-sm outline-none transition focus:border-black/30"
                            />

                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    aria-label="Clear search"
                                    className="absolute right-3 flex h-7 w-7 items-center justify-center rounded-full hover:bg-neutral-100"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                setIsFilterOpen((previous) => !previous)
                            }
                            aria-expanded={isFilterOpen}
                            className={`flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-xs font-medium transition sm:px-5 ${isFilterOpen
                                    ? "border-[#171717] bg-[#171717] text-white"
                                    : "border-black/10 bg-white text-[#171717]"
                                }`}
                        >
                            <SlidersHorizontal size={16} />
                            Filters
                        </button>

                        <div className="relative hidden md:block">
                            <select
                                value={sortBy}
                                onChange={(event) =>
                                    updateSort(event.target.value)
                                }
                                aria-label="Sort products"
                                className="h-11 appearance-none rounded-full border border-black/10 bg-white py-0 pl-5 pr-10 text-xs font-medium outline-none"
                            >
                                <option value="default">Sort</option>
                                <option value="best-selling">
                                    Best selling
                                </option>
                                <option value="price-low">
                                    Price: Low to High
                                </option>
                                <option value="price-high">
                                    Price: High to Low
                                </option>
                                <option value="name">Name: A-Z</option>
                            </select>

                            <ChevronDown
                                size={15}
                                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                            />
                        </div>
                    </div>
                </div>

                {/* Filter panel */}
                {isFilterOpen && (
                    <section className="mb-8 rounded-[24px] border border-black/10 bg-white p-5 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                                    Refine collection
                                </p>

                                <h2 className="mt-1 text-lg font-semibold">
                                    Filter products
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsFilterOpen(false)}
                                aria-label="Close filters"
                                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#f5f3ee]"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <div>
                                <p className="mb-3 text-xs uppercase tracking-[0.15em] text-neutral-400">
                                    Price range ({storeConfig.currency})
                                </p>

                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        min="0"
                                        value={minPrice}
                                        onChange={(event) =>
                                            setMinPrice(event.target.value)
                                        }
                                        placeholder="Min"
                                        aria-label="Minimum price"
                                        className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-black/30"
                                    />

                                    <input
                                        type="number"
                                        min="0"
                                        value={maxPrice}
                                        onChange={(event) =>
                                            setMaxPrice(event.target.value)
                                        }
                                        placeholder="Max"
                                        aria-label="Maximum price"
                                        className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-black/30"
                                    />
                                </div>

                                {invalidPriceRange && (
                                    <p className="mt-2 text-xs text-red-500">
                                        Minimum price must not exceed maximum.
                                    </p>
                                )}
                            </div>

                            <div>
                                <p className="mb-3 text-xs uppercase tracking-[0.15em] text-neutral-400">
                                    Availability
                                </p>

                                <label className="flex cursor-pointer items-center gap-3 text-sm text-neutral-600">
                                    <input
                                        type="checkbox"
                                        checked={inStockOnly}
                                        onChange={(event) =>
                                            setInStockOnly(event.target.checked)
                                        }
                                        className="h-4 w-4 accent-[#171717]"
                                    />
                                    In stock only
                                </label>
                            </div>

                            <div className="flex items-end">
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="rounded-full border border-black/10 px-5 py-2.5 text-xs font-medium text-neutral-600 transition hover:bg-[#171717] hover:text-white"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                {/* Results summary */}
                <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs text-neutral-400">
                        Showing{" "}
                        <span className="font-medium text-[#171717]">
                            {filteredProducts.length === 0
                                ? 0
                                : startIndex + 1}
                            {filteredProducts.length > 0 &&
                                `–${Math.min(
                                    startIndex + PRODUCTS_PER_PAGE,
                                    filteredProducts.length
                                )}`}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium text-[#171717]">
                            {filteredProducts.length}
                        </span>{" "}
                        products
                    </p>

                    <div className="flex items-center gap-3">
                        {hasActiveFilters && (
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="text-xs font-medium text-neutral-500 underline underline-offset-4 hover:text-[#171717]"
                            >
                                Clear filters
                            </button>
                        )}

                        <p className="hidden text-xs uppercase tracking-[0.15em] text-neutral-400 md:block">
                            {storeConfig.name} / Collection
                        </p>
                    </div>
                </div>

                {/* Product grid */}
                {currentProducts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                        {currentProducts.map((product) => {
                            const favorite = isInWishlist(product.id);
                            const fashion = product.category === "Fashion";
                            const productImage =
                                product.image || product.images?.[0];

                            return (
                                <article key={product.id} className="group">
                                    <div className="relative overflow-hidden rounded-[24px] bg-[#eae6df]">
                                        <Link
                                            to={`/products/${product.id}`}
                                            aria-label={`View ${product.name}`}
                                            className="block"
                                        >
                                            <div className="flex aspect-[4/5] items-center justify-center overflow-hidden p-3">
                                                <img
                                                    src={productImage}
                                                    alt={product.name}
                                                    loading="lazy"
                                                    className={`h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03] ${fashion
                                                            ? "rounded-xl object-cover"
                                                            : "object-contain"
                                                        }`}
                                                />
                                            </div>
                                        </Link>

                                        {product.stock === 0 && (
                                            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-medium uppercase tracking-wider text-neutral-600">
                                                Sold out
                                            </span>
                                        )}

                                        <button
                                            type="button"
                                            onClick={() => toggleWishlist(product)}
                                            aria-label={
                                                favorite
                                                    ? "Remove from wishlist"
                                                    : "Add to wishlist"
                                            }
                                            aria-pressed={favorite}
                                            className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300 ${favorite
                                                    ? "bg-[#171717] text-white"
                                                    : "bg-white/90 text-[#171717] sm:opacity-0 sm:group-hover:opacity-100"
                                                }`}
                                        >
                                            <Heart
                                                size={18}
                                                strokeWidth={1.7}
                                                fill={
                                                    favorite
                                                        ? "currentColor"
                                                        : "none"
                                                }
                                            />
                                        </button>

                                        <Link
                                            to={`/products/${product.id}`}
                                            aria-label={`View details for ${product.name}`}
                                            className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#171717] text-white transition-all duration-300 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
                                        >
                                            <ArrowUpRight size={18} />
                                        </Link>
                                    </div>

                                    <div className="mt-5">
                                        <p className="mb-1 text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                                            {product.category}
                                        </p>

                                        <div className="flex items-start justify-between gap-4">
                                            <Link
                                                to={`/products/${product.id}`}
                                                className="text-base font-medium tracking-[-0.02em] transition-colors hover:text-neutral-500"
                                            >
                                                {product.name}
                                            </Link>

                                            <span className="shrink-0 text-sm font-semibold">
                                                {formatPrice(product.price)}
                                            </span>
                                        </div>

                                        <p
                                            className={`mt-2 text-[10px] uppercase tracking-[0.15em] ${product.stock > 0
                                                    ? "text-neutral-400"
                                                    : "text-red-500"
                                                }`}
                                        >
                                            {product.stock > 0
                                                ? `${product.stock} available`
                                                : "Out of stock"}
                                        </p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex min-h-[350px] flex-col items-center justify-center rounded-[28px] bg-white px-6 text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f5f3ee]">
                            <Search
                                size={22}
                                className="text-neutral-400"
                            />
                        </div>

                        <h2 className="mt-5 text-lg font-medium">
                            No products found
                        </h2>

                        <p className="mt-2 text-sm text-neutral-400">
                            Try changing your search or filters.
                        </p>

                        <button
                            type="button"
                            onClick={clearFilters}
                            className="mt-5 rounded-full bg-[#171717] px-6 py-3 text-sm font-medium text-white transition hover:bg-black"
                        >
                            Clear filters
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <nav
                        aria-label="Product pagination"
                        className="mt-16 flex flex-wrap items-center justify-center gap-2"
                    >
                        <button
                            type="button"
                            onClick={() =>
                                setCurrentPage((page) =>
                                    Math.max(1, page - 1)
                                )
                            }
                            disabled={currentPage === 1}
                            aria-label="Previous page"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-[#171717] transition hover:bg-[#171717] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-[#171717]"
                        >
                            <ChevronLeft size={17} />
                        </button>

                        {pageNumbers.map((page) => (
                            <button
                                key={page}
                                type="button"
                                onClick={() => {
                                    setCurrentPage(page);
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                    });
                                }}
                                aria-label={`Page ${page}`}
                                aria-current={
                                    currentPage === page ? "page" : undefined
                                }
                                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm transition ${currentPage === page
                                        ? "bg-[#171717] text-white"
                                        : "text-neutral-500 hover:bg-white"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            type="button"
                            onClick={() =>
                                setCurrentPage((page) =>
                                    Math.min(totalPages, page + 1)
                                )
                            }
                            disabled={currentPage === totalPages}
                            aria-label="Next page"
                            className="flex h-10 items-center gap-2 rounded-full border border-black/10 bg-white px-4 text-sm text-neutral-600 transition hover:bg-[#171717] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-neutral-600"
                        >
                            Next
                            <ChevronRight size={15} />
                        </button>
                    </nav>
                )}

                <p className="mt-5 text-center text-xs text-neutral-400">
                    Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
                </p>
            </div>
        </main>
    );
};

export default Products;
