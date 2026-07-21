import { useCallback, useEffect, useState } from "react";
import { fetchCategories, fetchWorkouts } from "../lib/api";
import { getStoredFavoriteIds, saveFavoriteIds } from "../lib/favorites";
import type { ScoredWorkout, WorkoutFilters } from "../types/workout";

export const PROFILE_PRESETS = [
  {
    id: "cardio",
    label: "Profil Cardio",
    description: "Séances courtes, cardio et débutant",
    favoriteIds: [1, 6],
  },
  {
    id: "muscu",
    label: "Profil Musculation",
    description: "Renforcement avec matériel",
    favoriteIds: [3, 4],
  },
  {
    id: "zen",
    label: "Profil Souplesse",
    description: "Yoga, stretching, séances douces",
    favoriteIds: [7, 8],
  },
] as const;

export function useCatalogue() {
  const [categories, setCategories] = useState<string[]>([]);
  const [scoredWorkouts, setScoredWorkouts] = useState<ScoredWorkout[]>([]);
  const [filters, setFilters] = useState<WorkoutFilters>({ category: "" });
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => getStoredFavoriteIds());
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((err: Error) => setError(err.message));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchWorkouts({
      category: filters.category || undefined,
      maxDuration: filters.maxDuration,
      favoriteIds,
    })
      .then(setScoredWorkouts)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [filters, favoriteIds]);

  const toggleFavorite = useCallback((id: number) => {
    setActivePreset(null);
    setFavoriteIds((current) => {
      const next = current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id];
      saveFavoriteIds(next);
      return next;
    });
  }, []);

  const applyPreset = useCallback((presetId: string) => {
    const preset = PROFILE_PRESETS.find((item) => item.id === presetId);
    if (!preset) return;

    setActivePreset(presetId);
    setFavoriteIds([...preset.favoriteIds]);
    saveFavoriteIds([...preset.favoriteIds]);
  }, []);

  const clearFavorites = useCallback(() => {
    setActivePreset(null);
    setFavoriteIds([]);
    saveFavoriteIds([]);
  }, []);

  return {
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
  };
}
