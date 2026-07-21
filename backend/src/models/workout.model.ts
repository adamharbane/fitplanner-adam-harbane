export type Difficulty = "Débutant" | "Intermédiaire" | "Avancé";

export interface IWorkout {
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
  favoriteIds?: number[];
}

export interface IScoredWorkout extends IWorkout {
  score: number;
}

export interface ScoredWorkout {
  workout: Workout;
  score: number;
}

export class Workout implements IWorkout {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly category: string,
    public readonly duration: number,
    public readonly difficulty: Difficulty,
    public readonly equipment: boolean,
  ) {}

  static fromPlain(data: IWorkout): Workout {
    return new Workout(
      data.id,
      data.name,
      data.category,
      data.duration,
      data.difficulty,
      data.equipment,
    );
  }

  toJSON(): IWorkout {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      duration: this.duration,
      difficulty: this.difficulty,
      equipment: this.equipment,
    };
  }
}
