export function formatReleaseDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function voteToPercent(vote: number | null): number | null {
  if (vote == null || Number.isNaN(vote)) return null;
  return Math.round(vote * 10);
}
