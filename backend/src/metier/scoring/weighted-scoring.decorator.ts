import type { IScoringStrategy } from "../../interfaces/workout-scoring.interface.js";
import type { ScoredWorkout, Workout } from "../../models/workout.model.js";
import {
  computeCentroid,
  resolveFavoriteVectors,
  toVectors,
  type WorkoutVector,
} from "./workout-vector.utils.js";

export interface ScoringWeights {
  duration: number;
  difficulty: number;
  equipment: number;
  category: number;
}

function weightedEuclideanDistance(
  a: WorkoutVector,
  b: WorkoutVector,
  weights: ScoringWeights,
): number {
  const dDuration = a.duration - b.duration;
  const dDifficulty = a.difficulty - b.difficulty;
  const dEquipment = a.equipment - b.equipment;
  const dCategory = a.category - b.category;

  return Math.sqrt(
    weights.duration * dDuration ** 2 +
      weights.difficulty * dDifficulty ** 2 +
      weights.equipment * dEquipment ** 2 +
      weights.category * dCategory ** 2,
  );
}

export class WeightedScoringDecorator implements IScoringStrategy {
  constructor(
    private readonly scoringStrategy: IScoringStrategy,
    private readonly weights: ScoringWeights,
  ) {}

  score(workouts: Workout[], favoriteIds: number[]): ScoredWorkout[] {
    if (favoriteIds.length === 0 || workouts.length === 0) {
      return this.scoringStrategy.score(workouts, favoriteIds);
    }

    const vectors = toVectors(workouts);
    const favoriteVectors = resolveFavoriteVectors(vectors, favoriteIds);

    if (favoriteVectors.length === 0) {
      return this.scoringStrategy.score(workouts, favoriteIds);
    }

    const centroid = computeCentroid(favoriteVectors);

    return workouts
      .map((workout) => {
        const vector = vectors.get(workout.id);
        if (!vector) {
          return { workout, score: 0 };
        }

        const distance = weightedEuclideanDistance(
          vector,
          centroid,
          this.weights,
        );
        const score = Number((1 / (1 + distance)).toFixed(4));

        return { workout, score };
      })
      .sort((a, b) => b.score - a.score);
  }
}
