import { API_BASE_URL } from "../config";
import type { ApiResponse } from "../types/api";
import type { ScoredWorkout } from "../types/workout";

async function parseApiResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    throw new Error(
      response.status === 502 || response.status === 503 || response.status === 504
        ? "Le backend ne répond pas. Lancez-le avec : cd backend && npm run dev"
        : `Erreur HTTP ${response.status}`,
    );
  }

  const text = await response.text();
  if (!text) {
    throw new Error(
      "Le backend ne répond pas. Lancez-le avec : cd backend && npm run dev",
    );
  }

  try {
    return JSON.parse(text) as ApiResponse<T>;
  } catch {
    throw new Error("Réponse API invalide. Vérifiez que le backend tourne.");
  }
}

export async function fetchCategories(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/workouts/categories`);
  const payload = await parseApiResponse<string[]>(response);

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
  const payload = await parseApiResponse<ScoredWorkout[]>(response);

  if (!payload.success) {
    throw new Error(payload.message);
  }

  return payload.data;
}
