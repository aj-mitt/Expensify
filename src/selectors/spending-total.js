export default (spending) => {
  return spending
    .map((spending) => spending.amount)
    .reduce((sum, value) => sum + value, 0)
}
