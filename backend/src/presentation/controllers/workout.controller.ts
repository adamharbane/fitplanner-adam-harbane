import type { Request, Response } from "express";
import {
  getCategories,
  getWorkoutById,
  getWorkouts,
} from "../../metier/services/workout.service.js";

export function getAllWorkouts(req: Request, res: Response): void {
  const category =
    typeof req.query.category === "string" ? req.query.category : undefined;

  const maxDuration =
    typeof req.query.maxDuration === "string"
      ? Number(req.query.maxDuration)
      : undefined;

  const workouts = getWorkouts({ category, maxDuration });

  res.json({ success: true, data: workouts });
}

export function getOneWorkout(req: Request, res: Response): void {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ success: false, message: "Id invalide" });
    return;
  }

  const workout = getWorkoutById(id);

  if (!workout) {
    res.status(404).json({ success: false, message: "Séance introuvable" });
    return;
  }

  res.json({ success: true, data: workout });
}

export function getAllCategories(_req: Request, res: Response): void {
  const categories = getCategories();

  res.json({ success: true, data: categories });
}
