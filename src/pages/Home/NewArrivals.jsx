
import { ArrowUpRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import products from "../../data/product";
import formatPrice from "../../config/formatPrice";

const NewArrivals = () => {
  const { toggleWishlist, isInWishlist } = useWishlist();

  const newArrivals = [...products].slice(-4).reverse();

  if (!newArrivals.length) return null;

  const featuredProduct = newArrivals[0];
  const otherProducts = newArrivals.slice(1);

  const ProductImage = ({ product, featured = false }) => {
    const saved = isInWishlist(product.id);
    const image = product.image || product.images?.[0];

    return (
      <div className="relative overflow-hidden rounded-[24px] bg-[#e6e0d6]">
        <Link to={`/products/${product.id}`}>
          <div className={`overflow-hidden ${featured ? "aspect-[0.9] lg:aspect-[1.05]" : "aspect-[0.78]"}`}>
            <img
              src={image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </Link>

        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#171717] backdrop-blur-sm">
          New
        </span>

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={
            saved
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full transition-all ${saved ? "bg-[#171717] text-white" : "bg-white/90 text-[#171717]"
            }`}
        >
          <Heart size={16} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
    );
  };

  return (
    <section className="bg-white px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">
              Just landed
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.05em] text-[#171717] md:text-6xl">
              New <span className="font-light italic">arrivals.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-neutral-500">
            Discover the latest additions to our collection.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="group relative overflow-hidden rounded-[30px] bg-[#e6e0d6]">
            <ProductImage product={featuredProduct} featured />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-white/60">
                    {featuredProduct.category}
                  </p>
                  <Link to={`/products/${featuredProduct.id}`}>
                    <h3 className="text-2xl font-medium tracking-[-0.03em] md:text-3xl">
                      {featuredProduct.name}
                    </h3>
                  </Link>
                  <p className="mt-2 text-sm text-white/80">
                    {formatPrice(featuredProduct.price)}
                  </p>
                </div>

                <Link
                  to={`/products/${featuredProduct.id}`}
                  aria-label={`View ${featuredProduct.name}`}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#171717] transition-transform duration-300 hover:rotate-45"
                >
                  <ArrowUpRight size={19} />
                </Link>
              </div>
            </div>
          </article>

          <div className="grid grid-cols-2 gap-5">
            {otherProducts.map((product) => (
              <article key={product.id} className="group min-w-0">
                <ProductImage product={product} />

                <div className="mt-4">
                  <p className="mb-1 text-[9px] uppercase tracking-[0.18em] text-neutral-400">
                    {product.category}
                  </p>
                  <Link to={`/products/${product.id}`}>
                    <h3 className="text-sm font-medium tracking-[-0.02em] text-[#171717]">
                      {product.name}
                    </h3>
                  </Link>
                  <span className="mt-2 block text-sm font-semibold text-[#171717]">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/products"
            className="group flex items-center gap-3 rounded-full border border-[#171717] px-7 py-3.5 text-sm font-medium text-[#171717] transition-all duration-300 hover:bg-[#171717] hover:text-white"
          >
            Explore all products
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:rotate-45"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
