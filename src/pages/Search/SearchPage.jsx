
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, X, ArrowUpRight, Heart } from "lucide-react";
import products from "../../data/product.js";
import { useWishlist } from "../../context/WishlistContext.jsx";

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const { toggleWishlist, isInWishlist } = useWishlist();

    useEffect(() => {
        setQuery(searchParams.get("q") || "");
    }, [searchParams]);

    const results = useMemo(() => {
        const term = query.trim().toLowerCase();

        if (!term) return [];

        return products.filter((product) =>
            [
                product.name,
                product.category,
                product.description,
            ].some((value) => value?.toLowerCase().includes(term))
        );
    }, [query]);

    const handleSearch = (value) => {
        setQuery(value);

        const nextParams = new URLSearchParams(searchParams);

        if (value.trim()) {
            nextParams.set("q", value);
        } else {
            nextParams.delete("q");
        }

        setSearchParams(nextParams, { replace: true });
    };

    return (
        <main className="min-h-screen bg-[#f5f3ee] px-5 py-14 sm:px-8 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <p className="mb-4 text-xs uppercase tracking-[0.25em] text-neutral-400">
                    Find your favorites
                </p>

                <h1 className="text-5xl font-semibold tracking-[-0.06em] text-[#171717] md:text-7xl">
                    Search<span className="font-light italic"> everything.</span>
                </h1>

                <p className="mt-5 max-w-lg text-sm leading-6 text-neutral-500">
                    Discover thoughtfully selected pieces from the VELŌRA collection.
                </p>

                <div className="relative mt-10 max-w-2xl">
                    <Search
                        size={20}
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400"
                    />

                    <input
                        type="search"
                        autoFocus
                        value={query}
                        onChange={(event) => handleSearch(event.target.value)}
                        placeholder="Search products, categories..."
                        aria-label="Search products"
                        className="h-14 w-full rounded-full border border-black/10 bg-white pl-14 pr-14 text-sm text-[#171717] outline-none transition focus:border-black/30"
                    />

                    {query && (
                        <button
                            type="button"
                            onClick={() => handleSearch("")}
                            aria-label="Clear search"
                            className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full hover:bg-[#f5f3ee]"
                        >
                            <X size={17} />
                        </button>
                    )}
                </div>

                <div className="mb-6 mt-12 flex items-center justify-between gap-4">
                    <h2 className="text-lg font-medium text-[#171717]">
                        {!query.trim()
                            ? "Explore the collection"
                            : "Search results"}
                    </h2>

                    {query.trim() && (
                        <p className="text-xs text-neutral-400">
                            {results.length} products found
                        </p>
                    )}
                </div>

                {!query.trim() ? (
                    <div className="rounded-[24px] border border-black/10 bg-white p-8 sm:p-12">
                        <p className="text-sm leading-7 text-neutral-500">
                            Start typing to discover fashion, beauty, accessories,
                            and lifestyle essentials.
                        </p>

                        <Link
                            to="/products"
                            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#171717] underline underline-offset-4"
                        >
                            Browse all products
                            <ArrowUpRight size={16} />
                        </Link>
                    </div>
                ) : results.length > 0 ? (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4">
                        {results.map((product) => {
                            const saved = isInWishlist(product.id);

                            return (
                                <article key={product.id} className="group min-w-0">
                                    <div className="relative overflow-hidden rounded-[20px] bg-[#e8e3da]">
                                        <Link
                                            to={`/products/${product.id}`}
                                            aria-label={`View ${product.name}`}
                                        >
                                            <div className="aspect-[4/5] overflow-hidden">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    loading="lazy"
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() => toggleWishlist(product)}
                                            aria-label={
                                                saved
                                                    ? `Remove ${product.name} from wishlist`
                                                    : `Add ${product.name} to wishlist`
                                            }
                                            aria-pressed={saved}
                                            className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full ${saved
                                                    ? "bg-[#171717] text-white"
                                                    : "bg-white/90 text-[#171717]"
                                                }`}
                                        >
                                            <Heart
                                                size={17}
                                                fill={saved ? "currentColor" : "none"}
                                            />
                                        </button>
                                    </div>

                                    <p className="mb-1 mt-4 text-[10px] uppercase tracking-[0.16em] text-neutral-400">
                                        {product.category}
                                    </p>

                                    <Link
                                        to={`/products/${product.id}`}
                                        className="text-sm font-medium text-[#171717] hover:text-neutral-500"
                                    >
                                        {product.name}
                                    </Link>

                                    <p className="mt-2 text-sm font-semibold text-[#171717]">
                                        ${product.price}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                ) : (
                    <div className="rounded-[24px] bg-white px-6 py-16 text-center">
                        <Search size={28} className="mx-auto text-neutral-300" />

                        <h3 className="mt-4 text-lg font-medium text-[#171717]">
                            No products found
                        </h3>

                        <p className="mt-2 text-sm text-neutral-500">
                            Try another name or category.
                        </p>

                        <button
                            type="button"
                            onClick={() => handleSearch("")}
                            className="mt-5 rounded-full bg-[#171717] px-6 py-3 text-sm text-white"
                        >
                            Clear search
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
};

export default SearchPage;
