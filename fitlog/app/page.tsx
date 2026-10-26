
"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import { getWorkouts, type Workout } from "@/lib/workouts";

export default function Home() {
  // Store workouts from API
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  // Loading and error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Sort option
  const [sortBy, setSortBy] = useState("default");

  // Fetch workout data
  useEffect(() => {
    getWorkouts()
      .then((data) => {
        setWorkouts(data);
      })
      .catch(() => {
        setError("Failed to load workouts.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Sort without changing original API data
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

    // Default: API order
    return 0;
  });

  return (
    <main className="mx-auto max-w-[1280px] px-5 md:px-8">

      {/* HERO */}
      <div className="mt-6">
        <Hero />
      </div>

      {/* WORKOUT LIBRARY */}
      <section id="library" className="py-12">

        {/* Title and Sort */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">

          <div>
            <h2 className="heading-font text-3xl font-bold uppercase">
              THE LIBRARY
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">
              Sort By
            </span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-md border border-[#30343d] bg-[#171a20] px-3 py-2 text-xs text-white"
            >
              <option value="default">Default</option>
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>

        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-4">

            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-[#ccff00]" />

            <p className="text-sm text-gray-400">
              Loading workouts...
            </p>

          </div>
        ) : error ? (

          /* Error */
          <p className="py-20 text-center text-red-400">
            {error}
          </p>

        ) : sortedWorkouts.length === 0 ? (

          /* Empty API response */
          <p className="py-20 text-center text-gray-400">
            No workouts found.
          </p>

        ) : (

          /* Workout Cards */
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {sortedWorkouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
              />
            ))}

          </div>
        )}

      </section>
    </main>
  );
}
