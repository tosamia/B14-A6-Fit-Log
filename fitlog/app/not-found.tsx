
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">

      {/* Error Number */}
      <h1 className="heading-font text-[120px] font-bold leading-none text-[#ccff00] md:text-[180px]">
        404
      </h1>

      {/* Heading */}
      <h2 className="heading-font mt-4 text-3xl font-bold uppercase md:text-4xl">
        PAGE NOT FOUND
      </h2>

      {/* Message */}
      <p className="mt-3 max-w-md text-sm leading-6 text-gray-400">
        Looks like you took a wrong turn.
        The page you are looking for does not exist.
      </p>

      {/* Back to Home */}
      <Link
        href="/"
        className="mt-7 flex items-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-bold text-black transition hover:bg-lime-300"
      >
        <ArrowLeft size={17} />
        Back to Workouts
      </Link>

    </main>
  );
}
