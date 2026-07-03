export type Difficulty = "Débutant" | "Intermédiaire" | "Avancé";

export interface Workout {
  id: number;
  name: string;
  category: string;
  duration: number;
  difficulty: Difficulty;
  equipment: boolean;
}

export interface WorkoutFilters {
  category?: string;
  maxDuration?: number;
}
