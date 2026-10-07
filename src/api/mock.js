// Sample data used when no TMDB key is set, so the app still runs offline.
export const MOCK_GENRES = [
  { id: 28, name: "Action" }, { id: 35, name: "Comedy" }, { id: 18, name: "Drama" }, { id: 878, name: "Science Fiction" },
];
export const MOCK_MOVIES = [
  [1, "Orbital Drift", 878, 8.1, "2021-05-14", "A salvage crew finds a signal that should not exist."],
  [2, "Last Train to Madurai", 18, 7.6, "2019-11-02", "A retired conductor makes one final journey home."],
  [3, "Double Shift", 35, 6.9, "2022-03-18", "Two rival chefs are forced to share a kitchen."],
  [4, "Iron Monsoon", 28, 7.2, "2020-07-24", "A courier races across a flooded city with stolen data."],
  [5, "The Quiet Algorithm", 878, 7.9, "2023-09-08", "A data analyst discovers her model is predicting the future."],
  [6, "Paper Lanterns", 18, 8.4, "2018-01-26", "Three generations gather for a festival that changes everything."],
].map(([id, title, g, vote_average, release_date, overview]) => ({
  id, title, genre_ids: [g], genres: MOCK_GENRES.filter((x) => x.id === g),
  vote_average, vote_count: 1200, release_date, overview, poster_path: null, runtime: 100 + id * 4,
}));
