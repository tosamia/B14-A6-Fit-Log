
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[#252932] bg-[#0a0b0e]">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-5 py-7 md:px-8">

        {/* FitLog Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="FitLog Logo"
            width={20}
            height={20}
          />

          <span className="heading-font font-bold text-white">
            FITLOG
          </span>
        </Link>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}
