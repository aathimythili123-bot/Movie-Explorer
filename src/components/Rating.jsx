// Reusable rating badge: TMDB scores are out of 10.
export default function Rating({ value = 0, count }) {
  const score = Number(value).toFixed(1);
  const tone = value >= 7.5 ? "high" : value >= 6 ? "mid" : "low";
  return (
    <span className={`rating ${tone}`} aria-label={`Rated ${score} out of 10`}>
      ★ {value ? score : "N/A"}{count ? <small> ({count.toLocaleString()})</small> : null}
    </span>
  );
}
