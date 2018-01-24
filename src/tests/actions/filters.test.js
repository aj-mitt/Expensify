import moment from 'moment'
import {setStartDate, setEndDate, sortByAmount, sortByDate, setTextFilter} from '../../actions/filters'

test('Should test set start date object', () => {
  const action = setStartDate(moment(0))
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0)
  })
})

test('Should test set end date object', () => {
  const action = setEndDate(moment(0))
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(0)
  })
})

test('Should test sort by date object', () => {
  const action = sortByDate()
  expect(action).toEqual({
    type: 'SORT_BY_DATE'
  })
})

test('Should test sort by amount object', () => {
  const action = sortByAmount()
  expect(action).toEqual({
    type: 'SORT_BY_AMOUNT'
  })
})

test('Should test set text filter object', () => {
  const text = 'Testing'
  const action = setTextFilter('Testing')
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text
  })
})

test('Should test set text filter object with default values', () => {
  const action = setTextFilter()
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  })
})
