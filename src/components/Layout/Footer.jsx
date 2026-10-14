import {
    ArrowUpRight,
    Mail,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[#171717] px-6 pb-6 pt-16 text-white md:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
                    <div>
                        <h2 className="text-4xl font-semibold tracking-[-0.06em] md:text-5xl">
                            VELŌRA<span className="font-light">.</span>
                        </h2>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-white/50">
                            Thoughtfully selected pieces for a more considered everyday.
                            Discover products made to fit your life and elevate it.
                        </p>

                        <div className="mt-7 flex items-center gap-3">
                            <a
                                href="#"
                                aria-label="Instagram"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all duration-300 hover:bg-white hover:text-[#171717]"
                            >
                                <FaInstagram size={17} />
                            </a>

                            <a
                                href="#"
                                aria-label="Facebook"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all duration-300 hover:bg-white hover:text-[#171717]"
                            >
                                <FaFacebookF size={17} />
                            </a>

                            <a
                                href="#"
                                aria-label="Twitter"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all duration-300 hover:bg-white hover:text-[#171717]"
                            >
                                <FaTwitter size={17} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                            Explore
                        </h3>

                        <div className="flex flex-col gap-3">
                            <a
                                href="/"
                                className="w-fit text-sm text-white/70 transition-colors hover:text-white"
                            >
                                Home
                            </a>

                            <a
                                href="/products"
                                className="w-fit text-sm text-white/70 transition-colors hover:text-white"
                            >
                                Shop
                            </a>

                            <a
                                href="/products?category=new"
                                className="w-fit text-sm text-white/70 transition-colors hover:text-white"
                            >
                                New Arrivals
                            </a>

                            <a
                                href="/products?category=bestsellers"
                                className="w-fit text-sm text-white/70 transition-colors hover:text-white"
                            >
                                Best Sellers
                            </a>

                            <a
                                href="/about"
                                className="w-fit text-sm text-white/70 transition-colors hover:text-white"
                            >
                                About Us
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                            Help
                        </h3>

                        <div className="flex flex-col gap-3">
                            <a
                                href="/contact"
                                className="w-fit text-sm text-white/70 transition-colors hover:text-white"
                            >
                                Contact
                            </a>

                            <a
                                href="/shipping"
                                className="w-fit text-sm text-white/70 transition-colors hover:text-white"
                            >
                                Shipping & Delivery
                            </a>

                            <a
                                href="/returns"
                                className="w-fit text-sm text-white/70 transition-colors hover:text-white"
                            >
                                Returns & Exchanges
                            </a>

                            <a
                                href="/faq"
                                className="w-fit text-sm text-white/70 transition-colors hover:text-white"
                            >
                                FAQs
                            </a>

                            <a
                                href="/privacy"
                                className="w-fit text-sm text-white/70 transition-colors hover:text-white"
                            >
                                Privacy Policy
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                            Stay in the loop
                        </h3>

                        <p className="mb-5 max-w-xs text-sm leading-6 text-white/50">
                            Join our newsletter for new arrivals, curated edits, and
                            occasional surprises.
                        </p>

                        <form className="flex border-b border-white/20 pb-3">
                            <div className="flex flex-1 items-center gap-3">
                                <Mail size={17} className="text-white/40" />

                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                                />
                            </div>

                            <button
                                type="submit"
                                aria-label="Subscribe"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#171717] transition-transform duration-300 hover:rotate-45"
                            >
                                <ArrowUpRight size={16} />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="flex flex-col gap-4 pt-6 text-[10px] uppercase tracking-[0.2em] text-white/30 md:flex-row md:items-center md:justify-between">
                    <p>© 2026 VELŌRA. All rights reserved.</p>

                    <div className="flex items-center gap-6">
                        <span>Everyday, Elevated.</span>
                        <span>Designed with intention.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;