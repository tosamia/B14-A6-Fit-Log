
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useWorkout();

  const workoutActive = pathname !== "/my-plan";

  return (
    <header className="border-b border-[#252932] bg-[#0d0f12]">
      <nav className="mx-auto flex min-h-16 max-w-[1280px] flex-wrap items-center justify-between gap-3 px-5 py-3 md:px-8">

        {/* Original logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="FitLog"
            width={24}
            height={24}
            className="object-contain"
          />

          <span className="heading-font text-lg font-bold tracking-wide">
            FITLOG
          </span>
        </Link>

        {/* Middle links */}
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className={`rounded-full px-4 py-2 text-xs font-semibold ${
              workoutActive
                ? "bg-[#202a08] text-[#ccff00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-4 py-2 text-xs font-semibold ${
              pathname === "/my-plan"
                ? "bg-[#202a08] text-[#ccff00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Right counters */}
        <div className="flex items-center gap-3 text-xs">
          <Link href="/my-plan" className="flex items-center gap-1">
            <span>Plan</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ccff00] font-bold text-black">
              {plan.length}
            </span>
          </Link>

          <Link href="/my-plan" className="flex items-center gap-1 text-gray-400">
            <span>Saved</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-600 text-white">
              {saved.length}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
