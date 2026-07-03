import { Workout } from "../../models/workout.model.js";
import type { IWorkoutDataSource } from "../../interfaces/workout-data-source.interface.js";

const RAW_WORKOUTS = [
  {
    id: 1,
    name: "Cardio express",
    category: "Cardio",
    duration: 20,
    difficulty: "Débutant" as const,
    equipment: false,
  },
  {
    id: 2,
    name: "Course à pied",
    category: "Cardio",
    duration: 45,
    difficulty: "Intermédiaire" as const,
    equipment: false,
  },
  {
    id: 3,
    name: "Full body maison",
    category: "Musculation",
    duration: 30,
    difficulty: "Débutant" as const,
    equipment: false,
  },
  {
    id: 4,
    name: "Haut du corps",
    category: "Musculation",
    duration: 40,
    difficulty: "Intermédiaire" as const,
    equipment: true,
  },
  {
    id: 5,
    name: "HIIT intense",
    category: "Cardio",
    duration: 25,
    difficulty: "Avancé" as const,
    equipment: false,
  },
  {
    id: 6,
    name: "Renforcement abdos",
    category: "Renforcement",
    duration: 15,
    difficulty: "Débutant" as const,
    equipment: false,
  },
  {
    id: 7,
    name: "Stretching complet",
    category: "Souplesse",
    duration: 20,
    difficulty: "Débutant" as const,
    equipment: false,
  },
  {
    id: 8,
    name: "Yoga flow",
    category: "Souplesse",
    duration: 35,
    difficulty: "Intermédiaire" as const,
    equipment: false,
  },
];

export class WorkoutSource implements IWorkoutDataSource {
  private readonly workouts: Workout[];

  constructor() {
    this.workouts = RAW_WORKOUTS.map((data) => Workout.fromPlain(data));
  }

  getAll(): Workout[] {
    return [...this.workouts];
  }
}
