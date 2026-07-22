import type { Difficulty, Workout } from "../../models/workout.model.js";

export interface WorkoutVector {
  duration: number;
  difficulty: number;
  equipment: number;
  category: number;
}

const difficultyToNumber: Record<Difficulty, number> = {
  Débutant: 1,
  Intermédiaire: 2,
  Avancé: 3,
};

function normalize(value: number, min: number, max: number): number {
  if (max === min) {
    return 0.5;
  }

  return (value - min) / (max - min);
}

function createCategoryMap(workouts: Workout[]): Map<string, number> {
  const categories = [...new Set(workouts.map((workout) => workout.category))];
  return new Map(categories.map((category, index) => [category, index + 1]));
}

export function toVectors(workouts: Workout[]): Map<number, WorkoutVector> {
  const durations = workouts.map((workout) => workout.duration);
  const categoryMap = createCategoryMap(workouts);
  const categoryIndexes = workouts.map(
    (workout) => categoryMap.get(workout.category) ?? 0,
  );

  const minDuration = Math.min(...durations);
  const maxDuration = Math.max(...durations);
  const minCategory = Math.min(...categoryIndexes);
  const maxCategory = Math.max(...categoryIndexes);

  return new Map(
    workouts.map((workout) => {
      const categoryIndex = categoryMap.get(workout.category) ?? 0;

      return [
        workout.id,
        {
          duration: normalize(workout.duration, minDuration, maxDuration),
          difficulty: normalize(difficultyToNumber[workout.difficulty], 1, 3),
          equipment: workout.equipment ? 1 : 0,
          category: normalize(categoryIndex, minCategory, maxCategory),
        },
      ];
    }),
  );
}

export function computeCentroid(vectors: WorkoutVector[]): WorkoutVector {
  const size = vectors.length;

  return vectors.reduce(
    (accumulator, vector) => ({
      duration: accumulator.duration + vector.duration / size,
      difficulty: accumulator.difficulty + vector.difficulty / size,
      equipment: accumulator.equipment + vector.equipment / size,
      category: accumulator.category + vector.category / size,
    }),
    { duration: 0, difficulty: 0, equipment: 0, category: 0 },
  );
}

export function resolveFavoriteVectors(
  vectors: Map<number, WorkoutVector>,
  favoriteIds: number[],
): WorkoutVector[] {
  return favoriteIds
    .map((id) => vectors.get(id))
    .filter((vector): vector is WorkoutVector => Boolean(vector));
}
