
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Bookmark, CalendarPlus } from "lucide-react";
import { getWorkouts, type Workout } from "@/lib/workouts";
import { useWorkout } from "@/context/WorkoutContext";

export default function WorkoutDetailsPage() {
  const params = useParams();
  const id = String(params.id);

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  const { plan, saved, addToPlan, saveWorkout } = useWorkout();

  useEffect(() => {
    setLoading(true);

    getWorkouts()
      .then((data) => {
        const found = data.find(
          (item) => String(item.id) === id
        );
        setWorkout(found || null);
      })
      .catch(() => setWorkout(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border border-gray-700 border-t-[#ccff00]" />
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center">
        <h1 className="heading-font text-2xl font-bold">
          WORKOUT NOT FOUND
        </h1>
      </div>
    );
  }

  const inPlan = plan.some((item) => item.id === workout.id);
  const isSaved = saved.some((item) => item.id === workout.id);

  const specs = [
    ["EQUIPMENT", workout.equipment],
    ["DIFFICULTY", workout.difficulty],
    ["SETS", workout.sets],
    ["REPS", workout.reps],
    ["DURATION", `${workout.duration} min`],
    ["CALORIES", `${workout.caloriesBurned} kcal`],
    ["RATING", workout.rating],
  ];

  return (
    <main className="mx-auto max-w-[1200px] px-5 pt-10 pb-20 md:px-8">

      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-10">

        {/* LEFT IMAGE */}
        <div className="overflow-hidden rounded-xl">
          <img
            src="/workout.png"
            alt={workout.name}
            className="h-[360px] w-full rounded-xl object-cover sm:h-[460px] md:h-[525px]"
          />
        </div>

        {/* RIGHT DETAILS */}
        <div>

          {/* Title */}
          <h1 className="heading-font text-[30px] font-bold uppercase leading-none md:text-[34px]">
            {workout.name}
          </h1>

          {/* Description */}
          <p className="mt-3 text-[12px] leading-[18px] text-[#9298a3]">
            {workout.description}
          </p>

          {/* Muscle tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map((group, index) => (
              <span
                key={index}
                className="rounded-full bg-[#ccff00] px-3 py-1 text-[10px] font-bold text-black"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Specs table */}
          <div className="mt-5 overflow-hidden rounded-lg border border-[#252a32] bg-[#171a20]">

            {specs.map(([label, value], index) => (
              <div
                key={index}
                className="flex min-h-[40px] items-center justify-between gap-4 border-b border-[#252a32] px-4 last:border-b-0"
              >
                <span className="text-[10px] font-bold tracking-[1px] text-[#9298a3]">
                  {label}
                </span>

                <span className="text-right text-[11px] text-white">
                  {value}
                </span>
              </div>
            ))}

          </div>

          {/* Instructions */}
          <div className="mt-6">

            <h2 className="heading-font text-[18px] font-bold uppercase">
              INSTRUCTIONS
            </h2>

            <ol className="mt-3 list-decimal space-y-2 pl-4 text-[12px] leading-5 text-[#b0b4bd]">
              {workout.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>

          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap gap-3">

            <button
              onClick={() => addToPlan(workout)}
              disabled={inPlan}
              className="flex items-center gap-2 rounded-md bg-[#ccff00] px-4 py-[10px] text-[11px] font-bold text-black"
            >
              <CalendarPlus size={14} />
              {inPlan ? "Already in plan" : "Add to today's plan"}
            </button>

            <button
              onClick={() => saveWorkout(workout)}
              disabled={isSaved}
              className="flex items-center gap-2 rounded-md border border-[#343942] bg-transparent px-4 py-[10px] text-[11px] text-white"
            >
              <Bookmark size={14} />
              {isSaved ? "Already saved" : "Save for later"}
            </button>

          </div>

        </div>
      </div>
    </main>
  );
}
