
import { ArrowLeft, Check, Lock, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

const Checkout = () => {
    const navigate = useNavigate();

    const {
        cart,
        cartTotal,
        clearCart,
    } = useCart();

    const shipping = cartTotal >= 100 ? 0 : 10;
    const total = cartTotal + shipping;

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
    });

    const [paymentMethod, setPaymentMethod] = useState("card");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            return;
        }

        alert("Order placed successfully!");

        clearCart();
        navigate("/");
    };

    if (cart.length === 0) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#f5f3ee] px-6">
                <div className="rounded-[30px] bg-white px-8 py-12 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f5f3ee]">
                        <ShoppingBag
                            size={25}
                            strokeWidth={1.4}
                            className="text-neutral-500"
                        />
                    </div>

                    <h1 className="mt-6 text-2xl font-semibold text-[#171717]">
                        Your bag is empty.
                    </h1>

                    <p className="mt-3 text-sm text-neutral-500">
                        Add some products before checking out.
                    </p>

                    <Link
                        to="/products"
                        className="mt-7 inline-flex items-center rounded-full bg-[#171717] px-6 py-3.5 text-sm font-medium text-white"
                    >
                        Continue shopping
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#f5f3ee] px-6 py-12 md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">

                <Link
                    to="/cart"
                    className="mb-10 flex w-fit items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500 transition-colors hover:text-[#171717]"
                >
                    <ArrowLeft size={15} />
                    Back to bag
                </Link>

                <div className="mb-12">
                    <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">
                        Complete your order
                    </p>

                    <h1 className="text-5xl font-semibold tracking-[-0.06em] text-[#171717] md:text-7xl">
                        Check
                        <span className="font-light italic">out.</span>
                    </h1>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid gap-10 lg:grid-cols-[1fr_380px]"
                >
                    <div className="space-y-8">

                        {/* Contact Information */}
                        <section className="rounded-[28px] bg-white p-7 md:p-9">
                            <div className="mb-7 flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400">
                                        01
                                    </p>

                                    <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#171717]">
                                        Contact information
                                    </h2>
                                </div>

                                <Lock
                                    size={18}
                                    strokeWidth={1.6}
                                    className="text-neutral-400"
                                />
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="fullName"
                                        className="mb-2 block text-xs font-medium text-[#171717]"
                                    >
                                        Full name
                                    </label>

                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        required
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        className="h-12 w-full rounded-xl border border-black/10 bg-[#f5f3ee] px-4 text-sm outline-none transition focus:border-[#171717]"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-xs font-medium text-[#171717]"
                                    >
                                        Email address
                                    </label>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        className="h-12 w-full rounded-xl border border-black/10 bg-[#f5f3ee] px-4 text-sm outline-none transition focus:border-[#171717]"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="mb-2 block text-xs font-medium text-[#171717]"
                                    >
                                        Phone number
                                    </label>

                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+20 1XXXXXXXXX"
                                        className="h-12 w-full rounded-xl border border-black/10 bg-[#f5f3ee] px-4 text-sm outline-none transition focus:border-[#171717]"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Shipping Address */}
                        <section className="rounded-[28px] bg-white p-7 md:p-9">
                            <div className="mb-7">
                                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400">
                                    02
                                </p>

                                <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#171717]">
                                    Shipping address
                                </h2>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label
                                        htmlFor="address"
                                        className="mb-2 block text-xs font-medium text-[#171717]"
                                    >
                                        Address
                                    </label>

                                    <input
                                        id="address"
                                        name="address"
                                        type="text"
                                        required
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Street, building, apartment"
                                        className="h-12 w-full rounded-xl border border-black/10 bg-[#f5f3ee] px-4 text-sm outline-none transition focus:border-[#171717]"
                                    />
                                </div>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="city"
                                            className="mb-2 block text-xs font-medium text-[#171717]"
                                        >
                                            City
                                        </label>

                                        <input
                                            id="city"
                                            name="city"
                                            type="text"
                                            required
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="Your city"
                                            className="h-12 w-full rounded-xl border border-black/10 bg-[#f5f3ee] px-4 text-sm outline-none transition focus:border-[#171717]"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="postalCode"
                                            className="mb-2 block text-xs font-medium text-[#171717]"
                                        >
                                            Postal code
                                        </label>

                                        <input
                                            id="postalCode"
                                            name="postalCode"
                                            type="text"
                                            value={formData.postalCode}
                                            onChange={handleChange}
                                            placeholder="Optional"
                                            className="h-12 w-full rounded-xl border border-black/10 bg-[#f5f3ee] px-4 text-sm outline-none transition focus:border-[#171717]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Payment */}
                        <section className="rounded-[28px] bg-white p-7 md:p-9">
                            <div className="mb-7">
                                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400">
                                    03
                                </p>

                                <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#171717]">
                                    Payment method
                                </h2>
                            </div>

                            <div className="space-y-3">
                                <label
                                    className={`flex cursor - pointer items - center justify - between rounded - 2xl border p - 4 transition ${
    paymentMethod === "card"
        ? "border-[#171717] bg-[#f5f3ee]"
        : "border-black/10"
} `}
                                >
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="card"
                                            checked={
                                                paymentMethod === "card"
                                            }
                                            onChange={(e) =>
                                                setPaymentMethod(
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <div>
                                            <p className="text-sm font-medium text-[#171717]">
                                                Credit / Debit Card
                                            </p>

                                            <p className="mt-1 text-xs text-neutral-400">
                                                Secure online payment
                                            </p>
                                        </div>
                                    </div>

                                    <Lock
                                        size={16}
                                        className="text-neutral-400"
                                    />
                                </label>

                                <label
                                    className={`flex cursor - pointer items - center justify - between rounded - 2xl border p - 4 transition ${
    paymentMethod === "cash"
        ? "border-[#171717] bg-[#f5f3ee]"
        : "border-black/10"
} `}
                                >
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="cash"
                                            checked={
                                                paymentMethod === "cash"
                                            }
                                            onChange={(e) =>
                                                setPaymentMethod(
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <div>
                                            <p className="text-sm font-medium text-[#171717]">
                                                Cash on Delivery
                                            </p>

                                            <p className="mt-1 text-xs text-neutral-400">
                                                Pay when your order arrives
                                            </p>
                                        </div>
                                    </div>

                                    <ShoppingBag
                                        size={17}
                                        className="text-neutral-400"
                                    />
                                </label>
                            </div>
                        </section>
                    </div>

                    {/* Order Summary */}
                    <aside className="h-fit rounded-[28px] bg-white p-7 lg:sticky lg:top-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold tracking-[-0.03em] text-[#171717]">
                                Order summary
                            </h2>

                            <ShoppingBag
                                size={19}
                                strokeWidth={1.7}
                            />
                        </div>

                        <div className="my-7 space-y-4">
                            {cart.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex items-center gap-3"
                                >
                                    <div className="h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-[#f5f3ee]">
                                        <img
                                            src={
                                                product.image ||
                                                product.images?.[0]
                                            }
                                            alt={product.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-[#171717]">
                                            {product.name}
                                        </p>

                                        <p className="mt-1 text-xs text-neutral-400">
                                            Qty: {product.quantity}
                                        </p>
                                    </div>

                                    <p className="text-sm font-medium text-[#171717]">
                                        $
                                        {(
                                            product.price *
                                            product.quantity
                                        ).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="h-px bg-black/10" />

                        <div className="my-6 space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-neutral-500">
                                    Subtotal
                                </span>

                                <span className="font-medium text-[#171717]">
                                    ${cartTotal.toFixed(2)}
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-neutral-500">
                                    Shipping
                                </span>

                                <span className="font-medium text-[#171717]">
                                    {shipping === 0
                                        ? "Free"
                                        : `$${ shipping.toFixed(2) } `}
                                </span>
                            </div>
                        </div>

                        <div className="h-px bg-black/10" />

                        <div className="mt-6 flex items-center justify-between">
                            <span className="text-sm font-medium text-[#171717]">
                                Total
                            </span>

                            <span className="text-xl font-semibold text-[#171717]">
                                ${total.toFixed(2)}
                            </span>
                        </div>

                        <button
                            type="submit"
                            className="group mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-[#171717] px-6 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-black"
                        >
                            <Check
                                size={17}
                                className="transition-transform duration-300 group-hover:scale-110"
                            />
                            Place Order
                        </button>

                        <p className="mt-4 text-center text-[10px] leading-5 text-neutral-400">
                            By placing your order, you agree to our terms
                            and conditions.
                        </p>
                    </aside>
                </form>
            </div>
        </main>
    );
};

export default Checkout;