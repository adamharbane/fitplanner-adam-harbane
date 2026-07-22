# FitPlanner

Application de planification de séances de sport composée d'un **frontend React** (Vite) et d'une **API REST Node.js** (Express + TypeScript).

## Prérequis

- [Node.js](https://nodejs.org/) **v18 ou supérieur** (recommandé : v20 LTS)
- npm (fourni avec Node.js)

Vérifier l'installation :

```bash
node -v
npm -v
```

## Structure du projet

```
fitplanner-adam-harbane/
├── src/                  # Frontend React (Vite)
├── backend/              # API REST Express
│   └── src/
│       ├── acces-donnees/    # Sources et repositories
│       ├── metier/           # Logique métier (services)
│       ├── presentation/     # Routes et controllers
│       ├── models/           # Types TypeScript
│       └── config/           # Configuration (port, CORS)
├── package.json          # Dépendances frontend
└── backend/package.json  # Dépendances backend
```

## Installation

Le frontend et le backend ont chacun leurs propres dépendances. Il faut les installer séparément.

### 1. Frontend

À la racine du projet :

```bash
npm install
```

### 2. Backend

```bash
cd backend
npm install
cd ..
```

## Lancement en développement

Le frontend et le backend doivent tourner **en parallèle**, chacun dans un terminal distinct.

### Terminal 1 — Backend (API)

```bash
cd backend
npm run dev
```

L'API démarre sur **http://localhost:3001**.

### Terminal 2 — Frontend

À la racine du projet :

```bash
npm run dev
```

L'application démarre sur **http://localhost:5173**.

> Le backend autorise par défaut les requêtes venant de `http://localhost:5173` (configuration CORS).

## Variables d'environnement (backend)

Le backend fonctionne sans fichier `.env` grâce aux valeurs par défaut. Pour les personnaliser, créer un fichier `backend/.env` :

| Variable       | Défaut                    | Description                          |
|----------------|---------------------------|--------------------------------------|
| `PORT`         | `3001`                    | Port d'écoute de l'API               |
| `CORS_ORIGIN`  | `http://localhost:5173`   | Origine autorisée pour les requêtes CORS |

Exemple :

```env
PORT=3001
CORS_ORIGIN=http://localhost:5173
```

## Scripts disponibles

### Frontend (racine du projet)

| Commande          | Description                              |
|-------------------|------------------------------------------|
| `npm run dev`     | Lance le serveur de développement Vite   |
| `npm run build`   | Compile TypeScript et build de production |
| `npm run preview` | Prévisualise le build de production      |

### Backend (`backend/`)

| Commande          | Description                                      |
|-------------------|--------------------------------------------------|
| `npm run dev`     | Lance l'API en mode développement (rechargement auto) |
| `npm run build`   | Compile TypeScript vers `backend/dist/`          |
| `npm start`       | Lance l'API compilée (après `npm run build`)     |

## Build de production

### Backend

```bash
cd backend
npm run build
npm start
```

### Frontend

```bash
npm run build
npm run preview
```

Le build frontend est généré dans le dossier `dist/`.

## API — Endpoints

Base URL : `http://localhost:3001/api`

| Méthode | Route                        | Description                              |
|---------|------------------------------|------------------------------------------|
| `GET`   | `/api/health`                | Vérifier que l'API fonctionne            |
| `GET`   | `/api/workouts`              | Liste les séances filtrées, scorées et triées |
| `GET`   | `/api/workouts?category=Cardio` | Filtrer par objectif (catégorie)    |
| `GET`   | `/api/workouts?maxDuration=30`  | Filtrer par durée maximale (minutes) |
| `GET`   | `/api/workouts?favoriteIds=1,6` | Scorer via barycentre des favoris (ids CSV) |
| `GET`   | `/api/workouts/categories`   | Liste des objectifs disponibles          |
| `GET`   | `/api/workouts/:id`          | Détail d'une séance par son id           |

### Exemples de requêtes

```bash
# Santé de l'API
curl http://localhost:3001/api/health

# Toutes les séances
curl http://localhost:3001/api/workouts

# Séances Cardio de 30 min max
curl "http://localhost:3001/api/workouts?category=Cardio&maxDuration=30"

# Séances scorées par barycentre (favoris ids 1 et 6)
curl "http://localhost:3001/api/workouts?favoriteIds=1,6"

# Détail de la séance id 1
curl http://localhost:3001/api/workouts/1
```

### Format des réponses

Succès :

```json
{
  "success": true,
  "data": { ... }
}
```

Erreur :

```json
{
  "success": false,
  "message": "Description de l'erreur"
}
```

## Architecture et algorithme

### Flux applicatif

```
Front (filtres + favoris localStorage)
  → API (filtrage + scoring + tri)
    → Algorithme barycentre (couche métier)
      → Résultat affiché (séances + score)
```

1. Le **frontend** envoie les filtres (`category`, `maxDuration`) et les `favoriteIds` lus depuis `localStorage`.
2. L'**API** filtre le catalogue, calcule le score de chaque séance, puis trie le résultat.
3. Le **frontend** affiche la réponse telle quelle (pas de calcul côté client).

### Design patterns

| Famille | Pattern | Où | Rôle |
|---------|---------|-----|------|
| Création | **Factory** | `WorkoutFilterFactory` | Instancie les filtres selon les paramètres reçus |
| Création | **Singleton** | `AppSingleton.getInstance()` | Une seule instance pour assembler l'application |
| Structure | **Decorator** | `WeightedScoringDecorator` | Ajoute le scoring pondéré autour de la Strategy |
| Comportement | **Strategy** | `IScoringStrategy` / `BarycenterScoringStrategy` | Algorithme de scoring interchangeable |
| Comportement | **Chain of responsibility** | `WorkoutFilterPipeline` | Enchaîne les filtres (catégorie, durée) |

Pour ajouter un autre algorithme de scoring (ex. cosinus), il suffit d'implémenter `IScoringStrategy` et de l'injecter (éventuellement décoré) dans `WorkoutService`.

### Algorithme du barycentre (score pondéré via Decorator)

Chaque séance est représentée par **4 attributs numériques normalisés** (min-max) :

| Attribut | Source | Poids (`WeightedScoringDecorator`) |
|----------|--------|-------------------------------------|
| Durée | `duration` normalisée sur le catalogue filtré | 1.5 |
| Difficulté | `Débutant=1`, `Intermédiaire=2`, `Avancé=3` | 1.2 |
| Matériel | `0` (sans) ou `1` (avec) | 0.8 |
| Catégorie | index de la catégorie normalisé | 2.0 |

**Profil utilisateur** = barycentre (moyenne vectorielle) des séances favorites.

**Distance** = distance euclidienne **pondérée** :
`√(w_durée·Δ² + w_difficulté·Δ² + w_matériel·Δ² + w_catégorie·Δ²)`

**Score** = `1 / (1 + distance)` entre la séance et le barycentre.

Sans favoris, le Decorator délègue à la Strategy de base (tri alphabétique / score 0).

## Technologies

| Couche     | Stack                                      |
|------------|--------------------------------------------|
| Frontend   | React 19, TypeScript, Vite 6               |
| Backend    | Node.js, Express 5, TypeScript, tsx        |
