
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import storeConfig from "../../config/storeConfig";

const categoryImages = {
  Fashion:
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=90",
  Beauty:
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=90",
  Lifestyle:
    "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=90",
  Accessories:
    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=90",
};

const Categories = () => {
  const categories = storeConfig.categories;

  return (
    <section className="bg-[#f5f3ee] px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">
              Explore the edit
            </p>
            <h2 className="max-w-xl text-4xl font-semibold tracking-[-0.05em] text-[#171717] md:text-6xl">
              Find what feels
              <span className="font-light italic"> like you.</span>
            </h2>
          </div>

          <p className="max-w-xs text-sm leading-6 text-neutral-500">
            Thoughtfully selected categories, curated to make discovering
            something new feel effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link
              to={`/products?category=${encodeURIComponent(category)}`}
              key={category}
              className="group relative overflow-hidden rounded-[28px] bg-[#ded8cc]"
            >
              <div className="aspect-[0.78] overflow-hidden">
                <img
                  src={
                    categoryImages[category] ||
                    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=90"
                  }
                  alt={category}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

              <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                <span className="text-xs font-medium tracking-[0.15em] text-white/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#171717] opacity-0 transition-all duration-300 group-hover:rotate-45 group-hover:opacity-100">
                  <ArrowUpRight size={16} />
                </span>
              </div>

              <div className="absolute bottom-5 left-5 text-white">
                <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-white/60">
                  Explore collection
                </p>
                <h3 className="text-2xl font-medium tracking-[-0.03em]">
                  {category}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
