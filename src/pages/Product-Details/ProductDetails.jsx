
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    ArrowLeft,
    Heart,
    Minus,
    Plus,
    ShoppingBag,
    Star,
} from "lucide-react";

import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import products from "../../data/product.js";
import storeConfig from "../../config/storeConfig";
import formatPrice from "../../config/formatPrice";

const ProductDetails = () => {
    const { id } = useParams();

    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const { toggleWishlist, isInWishlist } = useWishlist();

    const {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        isInCart,
    } = useCart();

    const product = products.find(
        (item) => item.id === Number(id)
    );

    const cartProduct = cart.find(
        (item) => item.id === product?.id
    );

    const images = product
        ? product.images?.length
            ? product.images
            : product.image
                ? [product.image]
                : []
        : [];

    useEffect(() => {
        setSelectedImage(0);
    }, [id]);

    useEffect(() => {
        setQuantity(cartProduct ? cartProduct.quantity : 1);
    }, [cartProduct]);

    if (!product) {
        return (
            <main
                className="flex min-h-screen items-center justify-center px-6"
                style={{
                    backgroundColor: storeConfig.colors.background,
                    color: storeConfig.colors.text,
                }}
            >
                <div className="text-center">
                    <h1 className="text-3xl font-semibold">
                        Product not found
                    </h1>

                    <Link
                        to="/products"
                        className="mt-6 inline-flex items-center rounded-full px-6 py-3 text-sm font-medium text-white transition hover:opacity-80"
                        style={{
                            backgroundColor: storeConfig.colors.primary,
                        }}
                    >
                        <ArrowLeft size={16} className="mr-2" />
                        Back to shop
                    </Link>
                </div>
            </main>
        );
    }

    const isFavorite = isInWishlist(product.id);
    const isAddedToCart = isInCart(product.id);
    const isFashion = product.category === "Fashion";

    const handleIncrease = () => {
        if (quantity >= product.stock) return;

        if (isAddedToCart) {
            updateQuantity(product.id, quantity + 1);
        } else {
            setQuantity((current) => current + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity <= 1) return;

        if (isAddedToCart) {
            updateQuantity(product.id, quantity - 1);
        } else {
            setQuantity((current) => current - 1);
        }
    };

    const handleCartToggle = () => {
        if (isAddedToCart) {
            removeFromCart(product.id);
            setQuantity(1);
            return;
        }

        if (product.stock > 0) {
            addToCart(product, Math.min(quantity, product.stock));
        }
    };

    return (
        <main
            className="min-h-screen px-5 py-8 sm:px-8 sm:py-10 lg:px-16"
            style={{
                backgroundColor: storeConfig.colors.background,
                color: storeConfig.colors.text,
            }}
        >
            <div className="mx-auto max-w-7xl">
                <Link
                    to="/products"
                    className="mb-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500 transition-colors hover:opacity-70 sm:mb-10"
                >
                    <ArrowLeft size={15} />
                    Back to shop
                </Link>

                <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
                    {/* Product gallery */}
                    <section
                        aria-label="Product images"
                        className="grid grid-cols-[64px_minmax(0,1fr)] gap-3 sm:grid-cols-[88px_minmax(0,1fr)] sm:gap-5"
                    >
                        {/* Image thumbnails */}
                        <div className="flex flex-col gap-3">
                            {images.map((image, index) => (
                                <button
                                    key={`${product.id}-${image}-${index}`}
                                    type="button"
                                    onClick={() => setSelectedImage(index)}
                                    aria-label={`View image ${index + 1} of ${product.name}`}
                                    aria-pressed={selectedImage === index}
                                    className={`aspect-[4/5] w-full overflow-hidden rounded-xl border bg-white p-1 transition-all duration-300 ${selectedImage === index
                                            ? "border-neutral-900 ring-1 ring-neutral-900"
                                            : "border-black/10 hover:border-black/40"
                                        }`}
                                >
                                    <img
                                        src={image}
                                        alt={`${product.name} view ${index + 1}`}
                                        loading="lazy"
                                        className={`h-full w-full rounded-lg ${isFashion
                                                ? "object-cover"
                                                : "object-contain"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Main image */}
                        <div className="relative min-w-0 overflow-hidden rounded-[24px] bg-[#eae6df] sm:rounded-[30px]">
                            <div className="flex aspect-[4/5] items-center justify-center p-3 sm:p-5">
                                {images.length > 0 ? (
                                    <img
                                        key={`${product.id}-${selectedImage}`}
                                        src={images[selectedImage]}
                                        alt={product.name}
                                        fetchPriority="high"
                                        className={`h-full w-full transition-opacity duration-300 ${isFashion
                                                ? "rounded-xl object-cover"
                                                : "object-contain"
                                            }`}
                                    />
                                ) : (
                                    <p className="text-sm text-neutral-500">
                                        No image available
                                    </p>
                                )}
                            </div>

                            {images.length > 0 && (
                                <span className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-medium text-neutral-600 backdrop-blur-sm">
                                    {selectedImage + 1} / {images.length}
                                </span>
                            )}
                        </div>
                    </section>

                    {/* Product information */}
                    <section className="flex flex-col justify-center lg:sticky lg:top-10">
                        <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.25em] text-neutral-400">
                            {product.category}
                        </p>

                        <div className="flex items-start justify-between gap-5">
                            <h1
                                className="max-w-lg text-4xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-5xl lg:text-6xl"
                                style={{ color: storeConfig.colors.text }}
                            >
                                {product.name}
                            </h1>

                            <button
                                type="button"
                                onClick={() => toggleWishlist(product)}
                                aria-label={
                                    isFavorite
                                        ? "Remove from wishlist"
                                        : "Add to wishlist"
                                }
                                aria-pressed={isFavorite}
                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all sm:h-12 sm:w-12 ${isFavorite
                                        ? "border-neutral-900 bg-neutral-900 text-white"
                                        : "border-black/10 bg-white hover:border-black/40"
                                    }`}
                            >
                                <Heart
                                    size={19}
                                    fill={isFavorite ? "currentColor" : "none"}
                                    strokeWidth={1.7}
                                />
                            </button>
                        </div>

                        {/* Price and rating */}
                        <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
                            <span className="text-xl font-semibold">
                                {formatPrice(product.price)}
                            </span>

                            <div className="h-4 w-px bg-black/10" />

                            <div className="flex items-center gap-1.5">
                                <Star
                                    size={14}
                                    fill="currentColor"
                                    style={{
                                        color: storeConfig.colors.primary,
                                    }}
                                />

                                <span className="text-sm font-medium">
                                    {product.rating}
                                </span>

                                <span className="text-sm text-neutral-400">
                                    ({product.reviews} reviews)
                                </span>
                            </div>
                        </div>

                        <div className="my-8 h-px bg-black/10" />

                        <p className="max-w-xl text-sm leading-7 text-neutral-600">
                            {product.description}
                        </p>

                        {/* Quantity */}
                        <div className="mt-9">
                            <div className="mb-3 flex items-center justify-between">
                                <span className="text-xs font-medium uppercase tracking-[0.15em]">
                                    Quantity
                                </span>

                                <span
                                    className={`text-xs ${product.stock > 0
                                            ? "text-neutral-400"
                                            : "text-red-500"
                                        }`}
                                >
                                    {product.stock > 0
                                        ? `${product.stock} in stock`
                                        : "Out of stock"}
                                </span>
                            </div>

                            <div className="flex h-12 w-fit items-center rounded-full border border-black/10 bg-white">
                                <button
                                    type="button"
                                    onClick={handleDecrease}
                                    disabled={quantity <= 1}
                                    aria-label="Decrease quantity"
                                    className="flex h-12 w-12 items-center justify-center text-neutral-600 transition-colors hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-30"
                                >
                                    <Minus size={15} />
                                </button>

                                <span
                                    aria-live="polite"
                                    className="w-8 text-center text-sm font-medium"
                                >
                                    {quantity}
                                </span>

                                <button
                                    type="button"
                                    onClick={handleIncrease}
                                    disabled={
                                        product.stock === 0 ||
                                        quantity >= product.stock
                                    }
                                    aria-label="Increase quantity"
                                    className="flex h-12 w-12 items-center justify-center text-neutral-600 transition-colors hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-30"
                                >
                                    <Plus size={15} />
                                </button>
                            </div>
                        </div>

                        {/* Cart */}
                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={handleCartToggle}
                                disabled={
                                    !isAddedToCart && product.stock === 0
                                }
                                className="group flex w-full items-center justify-center gap-3 rounded-full px-6 py-4 text-sm font-medium text-white transition-all duration-300 hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
                                style={{
                                    backgroundColor: storeConfig.colors.primary,
                                    color: "#ffffff",
                                }}
                            >
                                <ShoppingBag
                                    size={18}
                                    strokeWidth={1.7}
                                    className="transition-transform duration-300 group-hover:-rotate-6"
                                />

                                {isAddedToCart
                                    ? "Remove from Cart"
                                    : product.stock === 0
                                        ? "Out of Stock"
                                        : "Add to Cart"}
                            </button>
                        </div>

                        {/* Store benefits */}
                        <div className="mt-8 grid grid-cols-3 border-y border-black/10 py-5">
                            <div className="pr-2">
                                <p className="text-xs font-medium">
                                    Free shipping
                                </p>
                                <p className="mt-1 text-[10px] leading-4 text-neutral-400">
                                    On orders over{" "}
                                    {formatPrice(
                                        storeConfig.freeShippingThreshold ?? 100
                                    )}
                                </p>
                            </div>

                            <div className="border-l border-black/10 px-3 sm:pl-4">
                                <p className="text-xs font-medium">
                                    Easy returns
                                </p>
                                <p className="mt-1 text-[10px] leading-4 text-neutral-400">
                                    Within{" "}
                                    {storeConfig.returnWindowDays ?? 30} days
                                </p>
                            </div>

                            <div className="border-l border-black/10 pl-3 sm:pl-4">
                                <p className="text-xs font-medium">
                                    Secure payment
                                </p>
                                <p className="mt-1 text-[10px] leading-4 text-neutral-400">
                                    100% protected
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default ProductDetails;
