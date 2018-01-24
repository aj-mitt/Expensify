import moment from 'moment'

export default (spending, {text, sortBy, startDate, endDate}) => {
  return spending.filter((spending) => {

    const createdAtMomnet = moment(spending.createdAt)
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMomnet, 'day') : true
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMomnet, 'day') : true
    const textMatch = spending.description.toLowerCase().includes(text.toLowerCase())

    return startDateMatch && endDateMatch && textMatch
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1
    }
  })
}
