import moment from 'moment'
import selectSpending from '../../selectors/spending'
import spending from '../fixtures/spending'

test('Should filter by text value', () => {
  const filters = {
    text: 'e',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  }
  const result = selectSpending(spending, filters)
  expect(result).toEqual([spending[2], spending[1]])
})

test('Should filter by start date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined
  }
  const result = selectSpending(spending, filters)
  expect(result).toEqual([spending[2], spending[0]])
})

test('Should fliter by end date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: moment(0).add(2, 'days')
  }
  const result = selectSpending(spending, filters)
  expect(result).toEqual([spending[0], spending[1]])
})

test('Should filter by date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  }
  const result = selectSpending(spending, filters)
  expect(result).toEqual([spending[2], spending[0], spending[1]])
})

test('Should filter sort by amount', () => {
  const filters ={
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
  const result = selectSpending(spending, filters)
  expect(result).toEqual([spending[1], spending[2], spending[0]])
})
