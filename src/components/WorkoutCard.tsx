import type { Workout } from "../types/workout";

interface WorkoutCardProps {
  workout: Workout;
  score: number;
  isFavorite: boolean;
  showScore: boolean;
  rank: number;
  onToggleFavorite: (id: number) => void;
}

const DIFFICULTY_CLASS: Record<Workout["difficulty"], string> = {
  Débutant: "badge--beginner",
  Intermédiaire: "badge--intermediate",
  Avancé: "badge--advanced",
};

export function WorkoutCard({
  workout,
  score,
  isFavorite,
  showScore,
  rank,
  onToggleFavorite,
}: WorkoutCardProps) {
  return (
    <article className={`workout-card${showScore ? " workout-card--ranked" : ""}`}>
      {showScore && (
        <span className="workout-card__rank" aria-label={`Rang ${rank}`}>
          #{rank}
        </span>
      )}

      <header className="workout-card__header">
        <div>
          <h2>{workout.name}</h2>
          <span className="workout-card__category">{workout.category}</span>
        </div>
        <button
          type="button"
          className={`favorite-btn${isFavorite ? " favorite-btn--active" : ""}`}
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          aria-pressed={isFavorite}
          onClick={() => onToggleFavorite(workout.id)}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </header>

      <ul className="workout-card__details">
        <li>
          <span className="detail-label">Durée</span>
          {workout.duration} min
        </li>
        <li>
          <span className={`badge ${DIFFICULTY_CLASS[workout.difficulty]}`}>
            {workout.difficulty}
          </span>
        </li>
        <li>
          {workout.equipment ? "Matériel requis" : "Sans matériel"}
        </li>
      </ul>

      {showScore && score > 0 && (
        <footer className="workout-card__score">
          <span>Score de recommandation</span>
          <strong>{score.toFixed(2)}</strong>
        </footer>
      )}
    </article>
  );
}
