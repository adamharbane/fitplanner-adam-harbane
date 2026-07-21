import { useCatalogue } from "../hooks/useCatalogue";
import { ProfilePresets } from "./ProfilePresets";
import { WorkoutCard } from "./WorkoutCard";
import { WorkoutFiltersBar } from "./WorkoutFiltersBar";

export function Catalogue() {
  const {
    categories,
    filters,
    setFilters,
    favoriteIds,
    activePreset,
    scoredWorkouts,
    loading,
    error,
    toggleFavorite,
    applyPreset,
    clearFavorites,
  } = useCatalogue();

  const hasFavorites = favoriteIds.length > 0;
  const sortLabel = hasFavorites
    ? "classement par barycentre (score de recommandation)"
    : "ordre alphabétique — ajoutez des favoris pour activer le scoring";

  return (
    <div className="catalogue">
      <header className="catalogue__hero">
        <div className="catalogue__hero-content">
          <p className="catalogue__eyebrow">FitPlanner</p>
          <h1>Trouvez la séance faite pour vous</h1>
          <p>
            Filtrez le catalogue, marquez vos séances préférées, et laissez
            l&apos;algorithme du barycentre recommander les séances les plus
            proches de votre profil.
          </p>
        </div>
      </header>

      <main className="catalogue__main">
        <ProfilePresets
          activePreset={activePreset}
          favoriteCount={favoriteIds.length}
          onApplyPreset={applyPreset}
          onClear={clearFavorites}
        />

        <WorkoutFiltersBar
          categories={categories}
          filters={filters}
          onChange={setFilters}
        />

        <section className="workout-list" aria-label="Liste des séances">
          <div className="workout-list__meta">
            <p className="workout-list__count">
              {loading
                ? "Chargement…"
                : `${scoredWorkouts.length} séance${scoredWorkouts.length > 1 ? "s" : ""}`}
            </p>
            <p className="workout-list__sort">{sortLabel}</p>
          </div>

          {error && (
            <div className="alert alert--error" role="alert">
              <strong>Erreur API</strong>
              <p>{error}</p>
              <p className="alert__hint">
                Vérifiez que le backend tourne sur{" "}
                <code>http://localhost:3001</code>
              </p>
            </div>
          )}

          {!loading && !error && scoredWorkouts.length === 0 && (
            <p className="workout-list__empty">
              Aucune séance ne correspond à vos critères.
            </p>
          )}

          {!error && scoredWorkouts.length > 0 && (
            <div className="workout-list__grid">
              {scoredWorkouts.map((workout, index) => (
                <WorkoutCard
                  key={workout.id}
                  workout={workout}
                  score={workout.score}
                  rank={index + 1}
                  isFavorite={favoriteIds.includes(workout.id)}
                  showScore={hasFavorites}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
