
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="rounded-xl bg-[#17191f] px-6 py-10 md:px-12 md:py-14">

      <div className="grid items-center gap-8 md:grid-cols-2">

        {/* Left side */}
        <div>
          <p className="mb-5 text-xs font-bold tracking-widest text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          <h1 className="heading-font text-4xl font-bold uppercase leading-[1.1] md:text-5xl lg:text-6xl">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="mt-5 max-w-md text-sm leading-6 text-gray-400">
            FitLog is a dark, no-nonsense gym companion:
            pick a lift, lock it into today's plan,
            and watch the week's work add up.
          </p>

          <a
            href="#library"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#ccff00] px-6 py-3 text-xs font-bold text-black hover:bg-lime-300"
          >
            BROWSE WORKOUTS
            <ArrowUpRight size={15} />
          </a>
        </div>

        {/* Right side: Original Figma banner */}
        <div className="flex items-center justify-center">
          <Image
            src="/banner.png"
            alt="FitLog workout banner"
            width={450}
            height={400}
            priority
            className="max-h-[340px] w-full object-contain"
          />
        </div>

      </div>
    </section>
  );
}
