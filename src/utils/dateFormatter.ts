export const isoToDotDate = (isoDateString: string): string => {
  const date = new Date(isoDateString);
  return date
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    })
    .replace(/\//g, ".");
};
