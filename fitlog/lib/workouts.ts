
export type Workout = {
  id: string;
  name: string;
  image: string;
  description: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  sets: number | string;
  reps: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
  instructions: string[];
};

const APIs = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog"
];

// Convert different API formats into one format
export function normalizeWorkout(item: any): Workout {
  return {
    id: String(item.id ?? item._id),
    name: item.name ?? item.title ?? "Unnamed Workout",
    image: item.image ?? item.imageUrl ?? "",
    description: item.description ?? "",
    muscleGroups: Array.isArray(item.muscleGroups)
      ? item.muscleGroups
      : Array.isArray(item.category)
        ? item.category
        : [item.category ?? "Workout"],
    equipment: Array.isArray(item.equipment)
      ? item.equipment.join(", ")
      : String(item.equipment ?? "No equipment"),
    difficulty: item.difficulty ?? "Intermediate",
    sets: item.sets ?? 3,
    reps: String(item.reps ?? "8-12"),
    duration: Number(item.duration ?? 0),
    caloriesBurned: Number(item.caloriesBurned ?? item.calories ?? 0),
    rating: Number(item.rating ?? 0),
    instructions: Array.isArray(item.instructions)
      ? item.instructions.map((step: any) =>
          typeof step === "string"
            ? step
            : String(step.text ?? step.description ?? "")
        )
      : []
  };
}

export async function getWorkouts(): Promise<Workout[]> {
  for (const api of APIs) {
    try {
      const response = await fetch(api);

      if (!response.ok) throw new Error("API failed");

      const result = await response.json();

      const data = Array.isArray(result)
        ? result
        : result.data ?? result.workouts ?? [];

      if (!Array.isArray(data)) {
        throw new Error("Invalid workout data");
      }

      return data.map(normalizeWorkout);
    } catch (error) {
      console.error("Trying another API:", error);
    }
  }

  throw new Error("Unable to load workouts");
}
