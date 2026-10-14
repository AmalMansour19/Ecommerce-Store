
import { ArrowUpRight, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import products from "../../data/product";
import formatPrice from "../../config/formatPrice";

const BestSellers = () => {
  const { wishlist, toggleWishlist } = useWishlist();

  const bestSellers = [...products]
    .sort(
      (a, b) =>
        (b.reviews ?? 0) - (a.reviews ?? 0) ||
        (b.rating ?? 0) - (a.rating ?? 0)
    )
    .slice(0, 4);

  const isInWishlist = (id) =>
    wishlist.some((item) => item.id === id);

  return (
    <section className="bg-[#f5f3ee] px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">
              Loved by many
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.05em] text-[#171717] md:text-6xl">
              Best <span className="font-light italic">sellers.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-neutral-500">
            Explore popular pieces from our collection.
          </p>
        </div>

        <div className="divide-y divide-black/10 border-y border-black/10">
          {bestSellers.map((product, index) => {
            const saved = isInWishlist(product.id);
            const image = product.image || product.images?.[0];

            return (
              <article
                key={product.id}
                className="group grid grid-cols-[auto_1fr] gap-5 py-6 md:grid-cols-[70px_180px_1fr_auto] md:items-center md:gap-8"
              >
                <span className="self-start pt-2 text-2xl font-light tracking-[-0.05em] text-neutral-300 md:self-auto md:pt-0 md:text-4xl">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative row-span-2 overflow-hidden rounded-[18px] bg-[#e3ddd3] md:row-span-1">
                  <Link to={`/products/${product.id}`}>
                    <div className="aspect-[0.9] overflow-hidden md:aspect-[1.1]">
                      <img
                        src={image}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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
                    className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition-all ${saved
                        ? "bg-[#171717] text-white"
                        : "bg-white/90 text-[#171717] opacity-100 md:opacity-0 md:group-hover:opacity-100"
                      }`}
                  >
                    <Heart size={16} fill={saved ? "currentColor" : "none"} />
                  </button>
                </div>

                <div className="flex min-w-0 flex-col justify-center">
                  <p className="mb-2 text-[9px] uppercase tracking-[0.2em] text-neutral-400">
                    {product.category}
                  </p>

                  <Link to={`/products/${product.id}`}>
                    <h3 className="text-xl font-medium tracking-[-0.03em] text-[#171717] transition-opacity hover:opacity-60 md:text-2xl">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Star size={13} fill="currentColor" className="text-[#171717]" />
                      <span className="text-xs font-medium">
                        {product.rating ?? "—"}
                      </span>
                    </div>

                    <span className="text-xs text-neutral-400">
                      {product.reviews ?? 0} reviews
                    </span>
                  </div>
                </div>

                <div className="col-start-2 flex items-center justify-between gap-5 md:col-auto md:flex-col md:items-end">
                  <span className="text-base font-semibold text-[#171717]">
                    {formatPrice(product.price)}
                  </span>

                  <Link
                    to={`/products/${product.id}`}
                    aria-label={`View ${product.name}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-[#171717] transition-all duration-300 group-hover:bg-[#171717] group-hover:text-white"
                  >
                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-300 group-hover:rotate-45"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/products?sort=best-selling"
            className="group flex items-center gap-3 text-sm font-medium text-[#171717]"
          >
            Explore best sellers
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#171717] text-white transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
