
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import storeConfig from "../../config/storeConfig";

const Hero = () => {
  const { hero, name } = storeConfig;

  return (
    <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-[#f5f3ee] px-6 md:px-10 lg:px-16">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div className="relative z-10 max-w-2xl">
          <h1 className="whitespace-pre-line text-[clamp(3.5rem,7vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-[#171717]">
            {hero.title}
          </h1>

          <p className="mt-8 max-w-md text-base leading-7 text-neutral-600 md:text-lg">
            {hero.description}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/products"
              className="group flex items-center gap-3 rounded-full bg-[#171717] px-7 py-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-black"
            >
              {hero.buttonText}
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={15} />
              </span>
            </Link>

            <Link
              to="/products?sort=best-selling"
              className="rounded-full border border-black/15 px-7 py-4 text-sm font-medium text-[#171717] transition-all duration-300 hover:bg-white"
            >
              View Best Sellers
            </Link>
          </div>
        </div>

        <div className="relative flex min-h-[500px] items-center justify-center lg:min-h-[650px]">
          <div className="absolute right-[8%] top-[8%] h-64 w-64 rounded-full bg-[#d9d2c5] blur-3xl" />

          <div className="absolute left-[4%] top-[18%] rotate-[-8deg] rounded-full border border-black/10 px-5 py-2 text-xs uppercase tracking-[0.25em] text-neutral-500">
            {hero.eyebrow}
          </div>

          <div className="relative h-[430px] w-[330px] overflow-hidden rounded-[180px] bg-[#ded8cc] shadow-2xl md:h-[550px] md:w-[420px]">
            <img
              src={hero.image}
              alt={`${name} collection`}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />

            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/85 p-4 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500">
                    Featured
                  </p>
                  <h3 className="mt-1 text-sm font-semibold text-neutral-900">
                    {name}
                  </h3>
                </div>

                <Link
                  to="/products"
                  aria-label="Explore products"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#171717] text-white transition-transform duration-300 hover:rotate-45"
                >
                  <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-[10%] left-[3%] hidden rounded-2xl border border-black/10 bg-white/70 px-5 py-4 backdrop-blur-md md:block">
            <p className="text-2xl font-semibold tracking-tight">4.9</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              Customer rating
            </p>
          </div>

          <div className="absolute right-[-5%] top-[42%] hidden rotate-90 text-[10px] uppercase tracking-[0.45em] text-neutral-400 lg:block">
            Carefully selected · 2026
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between border-t border-black/10 pt-4 text-[10px] uppercase tracking-[0.25em] text-neutral-400 md:left-10 md:right-10 lg:left-16 lg:right-16">
        <span>Scroll to discover</span>
        <span>01 / 04</span>
      </div>
    </section>
  );
};

export default Hero;
