import { PROFILE_PRESETS } from "../hooks/useCatalogue";

interface ProfilePresetsProps {
  activePreset: string | null;
  favoriteCount: number;
  onApplyPreset: (presetId: string) => void;
  onClear: () => void;
}

export function ProfilePresets({
  activePreset,
  favoriteCount,
  onApplyPreset,
  onClear,
}: ProfilePresetsProps) {
  return (
    <section className="profiles" aria-label="Profils utilisateur">
      <div className="profiles__header">
        <div>
          <h2>Votre profil</h2>
          <p>
            Les favoris définissent votre barycentre. Deux profils différents
            produisent deux classements différents sur le même catalogue.
          </p>
        </div>
        {favoriteCount > 0 && (
          <button type="button" className="btn btn--ghost" onClick={onClear}>
            Effacer ({favoriteCount})
          </button>
        )}
      </div>

      <div className="profiles__grid">
        {PROFILE_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className={`profile-card${activePreset === preset.id ? " profile-card--active" : ""}`}
            onClick={() => onApplyPreset(preset.id)}
          >
            <span className="profile-card__label">{preset.label}</span>
            <span className="profile-card__desc">{preset.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
