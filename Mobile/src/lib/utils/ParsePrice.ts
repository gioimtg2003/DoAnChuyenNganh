export const parsePrice = (price: string) =>
  price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
