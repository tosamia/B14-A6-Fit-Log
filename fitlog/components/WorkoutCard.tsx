
import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";
import type { Workout } from "@/lib/workouts";

type Props = {
  workout: Workout;
  displayName?: string;
  displayEquipment?: string;
  displayTags?: string[];
};

export default function WorkoutCard({
  workout,
  displayName,
  displayEquipment,
  displayTags,
}: Props) {
  const name = displayName ?? workout.name;
  const equipment = displayEquipment ?? workout.equipment;
  const tags = displayTags ?? workout.muscleGroups;

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="block overflow-hidden rounded-xl border border-[#242832] bg-[#17191f] transition hover:border-[#ccff00]"
    >
      {/* Original Figma workout image */}
      <div className="h-[150px] overflow-hidden">
        <img
          src="/workout.png"
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Workout information */}
      <div className="p-3">

        {/* Category tags */}
        <div className="mb-2 flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-[#ccff00] px-2 py-[3px] text-[10px] font-bold uppercase text-black"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Workout title */}
        <h3 className="heading-font text-base font-bold uppercase text-white">
          {name}
        </h3>

        {/* Equipment */}
        <p className="mt-1 text-[11px] text-gray-400">
          {equipment}
        </p>

        {/* Workout statistics */}
        <div className="mt-3 flex flex-wrap gap-3 border-t border-[#292d35] pt-3 text-[10px] text-gray-400">

          <span className="flex items-center gap-1">
            <Clock3 size={12} />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1">
            <Flame size={12} />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1">
            <Star size={12} />
            {workout.rating}
          </span>

        </div>
      </div>
    </Link>
  );
}
