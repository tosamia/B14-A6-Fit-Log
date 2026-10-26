
import { Suspense } from "react";
import WorkoutDetails from "./WorkoutDetails";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] items-center justify-center">
          <p className="text-sm text-gray-400">
            Loading workout details...
          </p>
        </div>
      }
    >
      <WorkoutDetails />
    </Suspense>
  );
}

