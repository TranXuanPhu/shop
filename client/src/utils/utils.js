function toMoneyString(nMoney = 0) {
  return (
    nMoney
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
      .split(".")[0] + "₫"
  );
}
export { toMoneyString };
