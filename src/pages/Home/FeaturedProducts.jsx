
import { ArrowUpRight, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import products from "../../data/product";
import formatPrice from "../../config/formatPrice";


const FeaturedProducts = () => {
  const { wishlist, toggleWishlist } = useWishlist();

  const featuredProducts = [...products]
    .sort(
      (a, b) =>
        (b.rating ?? 0) - (a.rating ?? 0) ||
        (b.reviews ?? 0) - (a.reviews ?? 0)
    )
    .slice(0, 4);

  const isInWishlist = (id) =>
    wishlist.some((item) => item.id === id);

  return (
    <section className="bg-[#f5f3ee] px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">
              The selection
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.05em] text-[#171717] md:text-6xl">
              Featured <span className="font-light italic">pieces.</span>
            </h2>
          </div>

          <Link
            to="/products"
            className="group flex w-fit items-center gap-3 border-b border-[#171717] pb-2 text-sm font-medium text-[#171717]"
          >
            View all products
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:rotate-45"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => {
            const saved = isInWishlist(product.id);
            const image = product.image || product.images?.[0];

            return (
              <article key={product.id} className="group">
                <div className="relative overflow-hidden rounded-[24px] bg-[#e4dfd6]">
                  <Link to={`/products/${product.id}`}>
                    <div className="aspect-[0.82] overflow-hidden">
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
                    className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full shadow-sm backdrop-blur-sm transition-all duration-300 ${saved
                        ? "bg-[#171717] text-white opacity-100"
                        : "bg-white/90 text-[#171717] opacity-100 md:opacity-0 md:group-hover:opacity-100"
                      }`}
                  >
                    <Heart
                      size={18}
                      strokeWidth={1.7}
                      fill={saved ? "currentColor" : "none"}
                    />
                  </button>

                  <Link
                    to={`/products/${product.id}`}
                    aria-label={`View ${product.name}`}
                    className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#171717] text-white opacity-100 transition-all duration-300 md:opacity-0 md:group-hover:rotate-45 md:group-hover:opacity-100"
                  >
                    <ArrowUpRight size={18} />
                  </Link>

                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.15em] text-[#171717] backdrop-blur-sm">
                    Featured
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="mb-1 text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                        {product.category}
                      </p>
                      <Link to={`/products/${product.id}`}>
                        <h3 className="text-base font-medium tracking-[-0.02em] text-[#171717] transition-opacity hover:opacity-60">
                          {product.name}
                        </h3>
                      </Link>
                    </div>

                    <p className="shrink-0 text-sm font-semibold text-[#171717]">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star size={13} fill="currentColor" className="text-[#171717]" />
                      <span className="text-xs font-medium text-[#171717]">
                        {product.rating ?? "—"}
                      </span>
                    </div>
                    <span className="text-xs text-neutral-400">
                      ({product.reviews ?? 0})
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
