export const formatDate = (purchaseDate: Date) => {
  const splitted = purchaseDate.toISOString().split("T");
  return `${splitted[0]} ${splitted[1].slice(0, 5)}`;
};
export const formatPrice = (price: bigint) => {
  let formatted = Number(price) / 100;
  return formatted.toFixed(2).concat(" zł").toString();
};
