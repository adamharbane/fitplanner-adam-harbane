import type { WorkoutFilters } from "../types/workout";

interface WorkoutFiltersBarProps {
  categories: string[];
  filters: WorkoutFilters;
  onChange: (filters: WorkoutFilters) => void;
}

const DURATION_OPTIONS = [
  { label: "Tous les temps", value: undefined },
  { label: "15 min max", value: 15 },
  { label: "30 min max", value: 30 },
  { label: "45 min max", value: 45 },
] as const;

export function WorkoutFiltersBar({
  categories,
  filters,
  onChange,
}: WorkoutFiltersBarProps) {
  return (
    <section className="filters" aria-label="Filtres de séances">
      <div className="filters__group">
        <label htmlFor="category">Objectif</label>
        <select
          id="category"
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value })}
        >
          <option value="">Tous les objectifs</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="filters__group">
        <label htmlFor="duration">Temps disponible</label>
        <select
          id="duration"
          value={filters.maxDuration ?? ""}
          onChange={(e) =>
            onChange({
              ...filters,
              maxDuration:
                e.target.value === "" ? undefined : Number(e.target.value),
            })
          }
        >
          {DURATION_OPTIONS.map((option) => (
            <option key={option.label} value={option.value ?? ""}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
