
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Clock3,
  Flame,
  Star,
  Check,
  X
} from "lucide-react";

import { useWorkout } from "@/context/WorkoutContext";
import type { Workout } from "@/lib/workouts";

export default function MyPlanPage() {

  const {
    plan,
    saved,
    done,
    markDone,
    removeFromPlan,
    removeFromSaved
  } = useWorkout();

  // Today's Plan or Saved tab
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

  // Sort dropdown
  const [sortBy, setSortBy] = useState("duration");

  // Calculate statistics
  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  // Select workouts for active tab
  const workouts: Workout[] =
    activeTab === "plan" ? plan : saved;

  // Sort workouts
  const sortedWorkouts = [...workouts].sort((a, b) => {

    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return b.caloriesBurned - a.caloriesBurned;
    }

    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    return 0;
  });

  return (
    <main className="mx-auto max-w-[1200px] px-5 py-10 md:px-8">

      {/* PAGE TITLE */}
      <div className="mb-5">

        <h1 className="heading-font text-3xl font-bold uppercase">
          MY PLAN
        </h1>

        <p className="mt-1 text-xs text-gray-400">
          Cap of five lifts for today. Finish them, then load more.
        </p>

      </div>

      {/* STATISTICS */}
      <div className="mb-8 grid grid-cols-3 rounded-xl border border-[#252a32] bg-[#14171d] px-5 py-6">

        {/* Exercises */}
        <div className="border-r border-[#252a32] pr-4">

          <p className="text-[11px] text-gray-400">
            Exercises
          </p>

          <h2 className="heading-font mt-1 text-3xl font-bold text-[#ccff00]">
            {plan.length}
          </h2>

        </div>

        {/* Minutes */}
        <div className="border-r border-[#252a32] px-5">

          <p className="text-[11px] text-gray-400">
            Minutes
          </p>

          <h2 className="heading-font mt-1 text-3xl font-bold text-white">
            {totalMinutes}
          </h2>

        </div>

        {/* Calories */}
        <div className="pl-5">

          <p className="text-[11px] text-gray-400">
            Calories
          </p>

          <h2 className="heading-font mt-1 text-3xl font-bold text-white">
            {totalCalories}
          </h2>

        </div>

      </div>

      {/* TABS AND SORTING */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

        {/* Tabs */}
        <div className="flex rounded-md border border-[#292d35] bg-[#171a20] p-1">

          <button
            onClick={() => setActiveTab("plan")}
            className={`rounded px-4 py-2 text-xs ${
              activeTab === "plan"
                ? "bg-[#2a2e37] font-semibold text-white"
                : "text-gray-400"
            }`}
          >
            Today&apos;s Plan
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`rounded px-4 py-2 text-xs ${
              activeTab === "saved"
                ? "bg-[#2a2e37] font-semibold text-white"
                : "text-gray-400"
            }`}
          >
            Saved
          </button>

        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">

          <span className="text-[11px] text-gray-400">
            Sort By
          </span>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-md border border-[#292d35] bg-[#171a20] px-3 py-2 text-xs text-white outline-none"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>

        </div>

      </div>

      {/* EMPTY STATE */}
      {sortedWorkouts.length === 0 ? (

        <div className="flex min-h-[290px] flex-col items-center justify-center rounded-xl border border-[#252a32] bg-[#0d0f12] px-5 text-center">

          <h2 className="heading-font text-xl font-bold uppercase">
            NOTHING HERE YET
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Browse the library and add a lift to get today moving.
          </p>

          <Link
            href="/#library"
            className="mt-5 rounded-full bg-[#ccff00] px-5 py-2 text-xs font-bold text-black"
          >
            Go to workouts
          </Link>

        </div>

      ) : (

        /* WORKOUT CARDS */
        <div className="space-y-3">

          {sortedWorkouts.map((workout) => {

            const isDone = done.includes(workout.id);

            return (
              <div
                key={workout.id}
                className="flex flex-col gap-4 rounded-xl border border-[#252a32] bg-[#14171d] p-4 sm:flex-row sm:items-center"
              >

                {/* IMAGE */}
                <img
                  src="/workout.png"
                  alt={workout.name}
                  className="h-[100px] w-full rounded-lg object-cover sm:h-[80px] sm:w-[140px]"
                />

                {/* WORKOUT INFO */}
                <div className="min-w-0 flex-1">

                  <div className="flex flex-wrap items-center gap-2">

                    <h2 className="heading-font text-xl font-bold uppercase">
                      {workout.name}
                    </h2>

                    {activeTab === "plan" && isDone && (
                      <span className="rounded-full bg-[#ccff00] px-2 py-1 text-[10px] font-bold text-black">
                        DONE
                      </span>
                    )}

                  </div>

                  <p className="mt-1 text-xs text-gray-400">
                    {workout.equipment}
                  </p>

                  {/* STATS */}
                  <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-gray-400">

                    <span className="flex items-center gap-1">
                      <Clock3 size={12} className="text-[#ccff00]" />
                      {workout.duration} min
                    </span>

                    <span className="flex items-center gap-1">
                      <Flame size={12} className="text-[#ccff00]" />
                      {workout.caloriesBurned} kcal
                    </span>

                    <span className="flex items-center gap-1">
                      <Star size={12} className="text-[#ccff00]" />
                      {workout.rating}
                    </span>

                  </div>

                </div>

                {/* ACTION BUTTONS */}
                <div className="flex flex-wrap items-center gap-2">

                  {/* View Details */}
                  <Link
                    href={`/workout/${workout.id}`}
                    className="rounded-full border border-[#3a3e48] px-4 py-2 text-[11px] text-white hover:border-[#ccff00]"
                  >
                    View Details
                  </Link>

                  {/* Mark as Done */}
                  {activeTab === "plan" && (
                    <button
                      onClick={() => markDone(workout.id)}
                      disabled={isDone}
                      className="flex items-center gap-1 rounded-full bg-[#ccff00] px-4 py-2 text-[11px] font-bold text-black"
                    >
                      <Check size={12} />
                      {isDone ? "Done" : "Mark as Done"}
                    </button>
                  )}

                  {/* Remove */}
                  <button
                    onClick={() => {
                      if (activeTab === "plan") {
                        removeFromPlan(workout.id);
                      } else {
                        removeFromSaved(workout.id);
                      }
                    }}
                    aria-label={`Remove ${workout.name}`}
                    className="px-2 text-gray-500 hover:text-red-400"
                  >
                    <X size={16} />
                  </button>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </main>
  );
}
