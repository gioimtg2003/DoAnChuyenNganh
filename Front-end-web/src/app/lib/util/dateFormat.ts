export const dateFormat = (date: string): string => {
  const dateObject = new Date(date);

  return dateObject.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
