
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import { toast } from "react-toastify";
import type { Workout } from "@/lib/workouts";

// Context type
type WorkoutContextType = {
  plan: Workout[];
  saved: Workout[];
  done: string[];
  loaded: boolean;

  addToPlan: (workout: Workout) => void;
  saveWorkout: (workout: Workout) => void;
  removeFromPlan: (id: string) => void;
  removeFromSaved: (id: string) => void;
  markDone: (id: string) => void;
};

// Create context
const WorkoutContext = createContext<WorkoutContextType | null>(null);

// Provider
export function WorkoutProvider({
  children
}: {
  children: React.ReactNode;
}) {

  // Workout states
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [done, setDone] = useState<string[]>([]);

  // Loading state
  const [loaded, setLoaded] = useState(false);

  // Read saved data when application starts
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved = localStorage.getItem("fitlog-saved");
      const storedDone = localStorage.getItem("fitlog-done");

      setPlan(storedPlan ? JSON.parse(storedPlan) : []);
      setSaved(storedSaved ? JSON.parse(storedSaved) : []);
      setDone(storedDone ? JSON.parse(storedDone) : []);

    } catch (error) {
      console.log("Could not restore saved workouts", error);
    }

    // Finished loading from localStorage
    setLoaded(true);
  }, []);

  // Save changes to localStorage
  useEffect(() => {

    // Do not overwrite stored data before loading
    if (!loaded) return;

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(plan)
    );

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(saved)
    );

    localStorage.setItem(
      "fitlog-done",
      JSON.stringify(done)
    );

  }, [plan, saved, done, loaded]);

  // Add workout to today's plan
  function addToPlan(workout: Workout) {

    // Prevent duplicate workouts
    if (plan.some((item) => item.id === workout.id)) {
      toast.info("Already in today's plan");
      return;
    }

    // Maximum five workouts
    if (plan.length >= 5) {
      toast.error("Maximum 5 workouts allowed");
      return;
    }

    setPlan((old) => [...old, workout]);

    toast.success("Added to today's plan");
  }

  // Save workout for later
  function saveWorkout(workout: Workout) {

    // Prevent duplicates
    if (saved.some((item) => item.id === workout.id)) {
      toast.info("Already saved");
      return;
    }

    setSaved((old) => [...old, workout]);

    toast.success("Workout saved for later");
  }

  // Remove workout from plan
  function removeFromPlan(id: string) {

    setPlan((old) =>
      old.filter((item) => item.id !== id)
    );

    // Remove completed status too
    setDone((old) =>
      old.filter((item) => item !== id)
    );

    toast.success("Removed from plan");
  }

  // Remove workout from saved list
  function removeFromSaved(id: string) {

    setSaved((old) =>
      old.filter((item) => item.id !== id)
    );

    toast.success("Removed from saved");
  }

  // Mark workout as completed
  function markDone(id: string) {

    if (done.includes(id)) {
      toast.info("Workout already completed");
      return;
    }

    setDone((old) => [...old, id]);

    toast.success("Workout marked as done!");
  }

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,
        done,
        loaded,
        addToPlan,
        saveWorkout,
        removeFromPlan,
        removeFromSaved,
        markDone
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

// Custom hook
export function useWorkout() {

  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error("WorkoutProvider is missing");
  }

  return context;
}
