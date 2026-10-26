
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import { toast } from "react-toastify";
import type { Workout } from "@/lib/workouts";

type WorkoutContextType = {
  plan: Workout[];
  saved: Workout[];
  done: string[];
  addToPlan: (workout: Workout) => void;
  saveWorkout: (workout: Workout) => void;
  removeFromPlan: (id: string) => void;
  removeFromSaved: (id: string) => void;
  markDone: (id: string) => void;
};

const WorkoutContext = createContext<WorkoutContextType | null>(null);

export function WorkoutProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [done, setDone] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Restore saved data after refresh
  useEffect(() => {
    try {
      setPlan(JSON.parse(localStorage.getItem("fitlog-plan") || "[]"));
      setSaved(JSON.parse(localStorage.getItem("fitlog-saved") || "[]"));
      setDone(JSON.parse(localStorage.getItem("fitlog-done") || "[]"));
    } catch {
      console.log("Could not restore saved workouts");
    }
    setLoaded(true);
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
    localStorage.setItem("fitlog-done", JSON.stringify(done));
  }, [plan, saved, done, loaded]);

  function addToPlan(workout: Workout) {
    if (plan.some((item) => item.id === workout.id)) {
      toast.info("Already in today's plan");
      return;
    }

    if (plan.length >= 5) {
      toast.error("Maximum 5 workouts allowed");
      return;
    }

    setPlan((old) => [...old, workout]);
    toast.success("Added to today's plan");
  }

  function saveWorkout(workout: Workout) {
    if (saved.some((item) => item.id === workout.id)) {
      toast.info("Already saved");
      return;
    }

    setSaved((old) => [...old, workout]);
    toast.success("Workout saved for later");
  }

  function removeFromPlan(id: string) {
    setPlan((old) => old.filter((item) => item.id !== id));
    setDone((old) => old.filter((item) => item !== id));
    toast.success("Removed from plan");
  }

  function removeFromSaved(id: string) {
    setSaved((old) => old.filter((item) => item.id !== id));
    toast.success("Removed from saved");
  }

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

export function useWorkout() {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error("WorkoutProvider is missing");
  }

  return context;
}
