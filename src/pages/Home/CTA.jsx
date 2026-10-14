
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import storeConfig from "../../config/storeConfig";

const CTA = () => {
  const { name, tagline, hero } = storeConfig;

  return (
    <section className="bg-white px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="relative min-h-[520px] overflow-hidden rounded-[32px] bg-[#dcd5ca]">
          <img
            src={hero.image}
            alt={`${name} collection`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/45" />

          <div className="relative z-10 flex min-h-[520px] flex-col justify-between p-7 text-white md:p-12 lg:p-16">
            <div className="flex items-start justify-between gap-4">
              <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[9px] uppercase tracking-[0.25em] backdrop-blur-md">
                The {name} edit
              </span>

              <span className="hidden text-right text-[10px] uppercase tracking-[0.3em] text-white/70 md:block">
                {tagline}
              </span>
            </div>

            <div className="max-w-3xl">
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.25em] text-white/70">
                Made for your everyday
              </p>

              <h2 className="text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-7xl lg:text-8xl">
                Find something
                <br />
                <span className="font-light italic">worth keeping.</span>
              </h2>

              <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
                <Link
                  to="/products"
                  className="group flex w-fit items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-[#171717] transition-all duration-300 hover:-translate-y-1"
                >
                  Explore the collection
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#171717] text-white transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={15} />
                  </span>
                </Link>

                <p className="max-w-xs text-sm leading-6 text-white/80">
                  {hero.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
