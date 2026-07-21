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
  {
    id: 9,
    name: "Circuit training",
    category: "Conditionnement",
    duration: 35,
    difficulty: "Intermédiaire" as const,
    equipment: true,
  },
  {
    id: 10,
    name: "Pilates core",
    category: "Pilates",
    duration: 30,
    difficulty: "Débutant" as const,
    equipment: false,
  },
  {
    id: 11,
    name: "Mobilité du soir",
    category: "Mobilité",
    duration: 20,
    difficulty: "Débutant" as const,
    equipment: false,
  },
  {
    id: 12,
    name: "Gainage express",
    category: "Renforcement",
    duration: 12,
    difficulty: "Débutant" as const,
    equipment: false,
  },
  {
    id: 13,
    name: "Upper body blast",
    category: "Musculation",
    duration: 45,
    difficulty: "Avancé" as const,
    equipment: true,
  },
  {
    id: 14,
    name: "Danse cardio",
    category: "Cardio",
    duration: 30,
    difficulty: "Intermédiaire" as const,
    equipment: false,
  },
  {
    id: 15,
    name: "Séance de récupération",
    category: "Souplesse",
    duration: 25,
    difficulty: "Débutant" as const,
    equipment: false,
  },
  {
    id: 16,
    name: "Power yoga",
    category: "Souplesse",
    duration: 40,
    difficulty: "Avancé" as const,
    equipment: false,
  },
  {
    id: 17,
    name: "Tabata squat",
    category: "Cardio",
    duration: 18,
    difficulty: "Avancé" as const,
    equipment: false,
  },
  {
    id: 18,
    name: "Fentes et pompes",
    category: "Musculation",
    duration: 35,
    difficulty: "Intermédiaire" as const,
    equipment: true,
  },
  {
    id: 19,
    name: "Stretch hips",
    category: "Souplesse",
    duration: 15,
    difficulty: "Débutant" as const,
    equipment: false,
  },
  {
    id: 20,
    name: "Rowing interval",
    category: "Cardio",
    duration: 30,
    difficulty: "Intermédiaire" as const,
    equipment: true,
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
