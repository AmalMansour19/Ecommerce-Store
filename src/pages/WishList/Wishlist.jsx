import {
    Heart,
    ShoppingBag,
    ArrowUpRight,
    Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";

const Wishlist = () => {
    const {
        wishlist,
        removeFromWishlist,
        clearWishlist,
    } = useWishlist();

    return (
        <main className="min-h-screen bg-[#f5f3ee] px-6 py-12 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">

                <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">
                            Your saved pieces
                        </p>

                        <h1 className="text-5xl font-semibold tracking-[-0.06em] text-[#171717] md:text-7xl">
                            Wishlist
                            <span className="font-light italic">.</span>
                        </h1>
                    </div>

                    {wishlist.length > 0 && (
                        <button
                            onClick={clearWishlist}
                            className="flex w-fit items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500 transition-colors hover:text-[#171717]"
                        >
                            <Trash2 size={15} />
                            Clear wishlist
                        </button>
                    )}
                </div>

                {wishlist.length > 0 ? (
                    <>
                        <div className="mb-8 flex items-center justify-between border-y border-black/10 py-5">
                            <p className="text-xs text-neutral-400">
                                <span className="font-medium text-[#171717]">
                                    {wishlist.length}
                                </span>{" "}
                                saved{" "}
                                {wishlist.length === 1 ? "item" : "items"}
                            </p>

                            <div className="flex items-center gap-2 text-xs text-neutral-400">
                                <Heart size={14} />
                                Saved for later
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                            {wishlist.map((product) => (
                                <article
                                    key={product.id}
                                    className="group"
                                >
                                    <div className="relative overflow-hidden rounded-[24px] bg-[#e4dfd6]">

                                        <Link to={`/products/${product.id}`}>
                                            <div className="aspect-[0.82] overflow-hidden">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                />
                                            </div>
                                        </Link>

                                        <button
                                            onClick={() =>
                                                removeFromWishlist(product.id)
                                            }
                                            aria-label="Remove from wishlist"
                                            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#171717] backdrop-blur-sm transition-all duration-300 hover:bg-[#171717] hover:text-white"
                                        >
                                            <Heart
                                                size={18}
                                                fill="currentColor"
                                                strokeWidth={1.7}
                                            />
                                        </button>

                                        <Link
                                            to={`/products/${product.id}`}
                                            aria-label="View product"
                                            className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#171717] text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:rotate-45"
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
                                                className="min-w-0"
                                            >
                                                <h2 className="text-base font-medium tracking-[-0.02em] text-[#171717] transition-opacity hover:opacity-60">
                                                    {product.name}
                                                </h2>

                                                <p className="mt-1 text-sm font-semibold text-[#171717]">
                                                    ${product.price}
                                                </p>
                                            </Link>

                                            <button
                                                aria-label="Add to bag"
                                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white transition-all duration-300 hover:bg-[#171717] hover:text-white"
                                            >
                                                <ShoppingBag
                                                    size={17}
                                                    strokeWidth={1.7}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex min-h-[500px] flex-col items-center justify-center rounded-[30px] bg-white px-6 text-center">

                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f5f3ee]">
                            <Heart
                                size={25}
                                strokeWidth={1.4}
                                className="text-neutral-500"
                            />
                        </div>

                        <h2 className="mt-6 text-2xl font-semibold tracking-[-0.04em] text-[#171717]">
                            Nothing saved yet.
                        </h2>

                        <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-500">
                            Save the pieces you love and come back to them
                            whenever you're ready.
                        </p>

                        <Link
                            to="/products"
                            className="mt-7 flex items-center gap-3 rounded-full bg-[#171717] px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1"
                        >
                            Explore the collection
                            <ArrowUpRight size={16} />
                        </Link>

                    </div>
                )}

            </div>
        </main>
    );
};

export default Wishlist;