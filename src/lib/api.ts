import { API_BASE_URL } from "../config";
import type { ApiResponse } from "../types/api";
import type { ScoredWorkout } from "../types/workout";

export async function fetchCategories(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/workouts/categories`);
  const payload = (await response.json()) as ApiResponse<string[]>;

  if (!payload.success) {
    throw new Error(payload.message);
  }

  return payload.data;
}

export async function fetchWorkouts(params: {
  category?: string;
  maxDuration?: number;
  favoriteIds?: number[];
}): Promise<ScoredWorkout[]> {
  const query = new URLSearchParams();

  if (params.category && params.category !== "Tous") {
    query.set("category", params.category);
  }

  if (params.maxDuration) {
    query.set("maxDuration", String(params.maxDuration));
  }

  if (params.favoriteIds && params.favoriteIds.length > 0) {
    query.set("favoriteIds", params.favoriteIds.join(","));
  }

  const url = `${API_BASE_URL}/workouts${query.size > 0 ? `?${query}` : ""}`;
  const response = await fetch(url);
  const payload = (await response.json()) as ApiResponse<ScoredWorkout[]>;

  if (!payload.success) {
    throw new Error(payload.message);
  }

  return payload.data;
}
