
import {
    ArrowLeft,
    ArrowUpRight,
    Minus,
    Plus,
    ShoppingBag,
    Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import storeConfig from "../../config/storeConfig";
import formatPrice from "../../config/formatPrice";

const Cart = () => {
    const {
        cart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
    } = useCart();

    const freeShippingThreshold =
        storeConfig.freeShippingThreshold ?? 100;

    const shippingCost = storeConfig.shippingCost ?? 10;

    const shipping =
        cartTotal === 0 || cartTotal >= freeShippingThreshold
            ? 0
            : shippingCost;

    const total = cartTotal + shipping;

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    return (
        <main
            className="min-h-screen px-6 py-12 md:px-10 lg:px-16"
            style={{
                backgroundColor: storeConfig.colors.background,
                color: storeConfig.colors.text,
            }}
        >
            <div className="mx-auto max-w-7xl">
                {/* Page heading */}
                <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">
                            Your selected pieces
                        </p>

                        <h1 className="text-5xl font-semibold tracking-[-0.06em] md:text-7xl">
                            Your
                            <span className="font-light italic"> bag.</span>
                        </h1>
                    </div>

                    {cart.length > 0 && (
                        <button
                            type="button"
                            onClick={clearCart}
                            className="flex w-fit items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500 transition-colors hover:text-neutral-900"
                        >
                            <Trash2 size={15} />
                            Clear bag
                        </button>
                    )}
                </div>

                {cart.length > 0 ? (
                    <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
                        {/* Cart items */}
                        <section>
                            <div className="mb-6 flex items-center justify-between border-y border-black/10 py-5">
                                <p className="text-xs text-neutral-400">
                                    <span className="font-medium text-neutral-900">
                                        {totalItems}
                                    </span>{" "}
                                    items in your bag
                                </p>

                                <div className="flex items-center gap-2 text-xs text-neutral-400">
                                    <ShoppingBag size={14} />
                                    Your selection
                                </div>
                            </div>

                            <div className="divide-y divide-black/10">
                                {cart.map((product) => {
                                    const image =
                                        product.image ||
                                        product.images?.[0];

                                    const stockLimit =
                                        product.stock ?? Infinity;

                                    return (
                                        <article
                                            key={product.id}
                                            className="flex gap-5 py-6 first:pt-0"
                                        >
                                            <Link
                                                to={`/products/${product.id}`}
                                                className="h-32 w-28 shrink-0 overflow-hidden rounded-2xl bg-[#e4dfd6] sm:h-40 sm:w-32"
                                            >
                                                {image && (
                                                    <img
                                                        src={image}
                                                        alt={product.name}
                                                        loading="lazy"
                                                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                                    />
                                                )}
                                            </Link>

                                            <div className="flex min-w-0 flex-1 flex-col justify-between">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="min-w-0">
                                                        <p className="mb-1 text-[9px] uppercase tracking-[0.18em] text-neutral-400">
                                                            {product.category}
                                                        </p>

                                                        <Link
                                                            to={`/products/${product.id}`}
                                                        >
                                                            <h2 className="text-base font-medium tracking-[-0.02em] transition-opacity hover:opacity-60 sm:text-lg">
                                                                {product.name}
                                                            </h2>
                                                        </Link>

                                                        <p className="mt-2 text-sm font-semibold">
                                                            {formatPrice(product.price)}
                                                        </p>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeFromCart(
                                                                product.id
                                                            )
                                                        }
                                                        aria-label={`Remove ${product.name}`}
                                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-neutral-400 transition-all duration-300 hover:bg-neutral-900 hover:text-white"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>

                                                <div className="mt-5 flex items-center justify-between gap-4">
                                                    <div className="flex h-10 items-center rounded-full border border-black/10 bg-white">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    product.id,
                                                                    product.quantity - 1
                                                                )
                                                            }
                                                            disabled={
                                                                product.quantity <= 1
                                                            }
                                                            aria-label="Decrease quantity"
                                                            className="flex h-10 w-10 items-center justify-center text-neutral-600 transition-colors hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-30"
                                                        >
                                                            <Minus size={14} />
                                                        </button>

                                                        <span
                                                            aria-live="polite"
                                                            className="w-8 text-center text-sm font-medium"
                                                        >
                                                            {product.quantity}
                                                        </span>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    product.id,
                                                                    product.quantity + 1
                                                                )
                                                            }
                                                            disabled={
                                                                product.quantity >= stockLimit
                                                            }
                                                            aria-label="Increase quantity"
                                                            className="flex h-10 w-10 items-center justify-center text-neutral-600 transition-colors hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-30"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>

                                                    <p className="text-sm font-semibold">
                                                        {formatPrice(
                                                            product.price *
                                                            product.quantity
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>

                            <Link
                                to="/products"
                                className="mt-8 flex w-fit items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500 transition-colors hover:text-neutral-900"
                            >
                                <ArrowLeft size={15} />
                                Continue shopping
                            </Link>
                        </section>

                        {/* Order summary */}
                        <aside className="h-fit rounded-[28px] bg-white p-7 lg:sticky lg:top-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold tracking-[-0.03em]">
                                    Order summary
                                </h2>

                                <ShoppingBag
                                    size={19}
                                    strokeWidth={1.7}
                                />
                            </div>

                            <div className="my-7 h-px bg-black/10" />

                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-neutral-500">
                                        Subtotal
                                    </span>

                                    <span className="font-medium">
                                        {formatPrice(cartTotal)}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-neutral-500">
                                        Shipping
                                    </span>

                                    <span className="font-medium">
                                        {shipping === 0
                                            ? "Free"
                                            : formatPrice(shipping)}
                                    </span>
                                </div>
                            </div>

                            <div className="my-6 h-px bg-black/10" />

                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                    Total
                                </span>

                                <span className="text-xl font-semibold">
                                    {formatPrice(total)}
                                </span>
                            </div>

                            {cartTotal < freeShippingThreshold && (
                                <p className="mt-4 rounded-xl bg-[#f5f3ee] px-4 py-3 text-xs leading-5 text-neutral-500">
                                    Add{" "}
                                    {formatPrice(
                                        freeShippingThreshold - cartTotal
                                    )}{" "}
                                    more to unlock free shipping.
                                </p>
                            )}

                            <Link
                                to="/checkout"
                                className="group mt-6 flex w-full items-center justify-center gap-3 rounded-full px-6 py-4 text-sm font-medium text-white transition-all duration-300 hover:opacity-85"
                                style={{
                                    backgroundColor: storeConfig.colors.primary,
                                }}
                            >
                                Checkout

                                <ArrowUpRight
                                    size={17}
                                    className="transition-transform duration-300 group-hover:rotate-45"
                                />
                            </Link>

                            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-black/10 pt-5">
                                <div>
                                    <p className="text-[10px] font-medium uppercase tracking-[0.12em]">
                                        Secure payment
                                    </p>

                                    <p className="mt-1 text-[9px] text-neutral-400">
                                        Protected checkout
                                    </p>
                                </div>

                                <div className="border-l border-black/10 pl-3">
                                    <p className="text-[10px] font-medium uppercase tracking-[0.12em]">
                                        Easy returns
                                    </p>

                                    <p className="mt-1 text-[9px] text-neutral-400">
                                        Within{" "}
                                        {storeConfig.returnWindowDays ?? 30} days
                                    </p>
                                </div>
                            </div>
                        </aside>
                    </div>
                ) : (
                    <div className="flex min-h-[500px] flex-col items-center justify-center rounded-[30px] bg-white px-6 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f5f3ee]">
                            <ShoppingBag
                                size={25}
                                strokeWidth={1.4}
                                className="text-neutral-500"
                            />
                        </div>

                        <h2 className="mt-6 text-2xl font-semibold tracking-[-0.04em]">
                            Your bag is empty.
                        </h2>

                        <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-500">
                            Looks like you haven't added anything yet.
                            Discover something you'll love.
                        </p>

                        <Link
                            to="/products"
                            className="mt-7 flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1"
                            style={{
                                backgroundColor: storeConfig.colors.primary,
                            }}
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

export default Cart;
