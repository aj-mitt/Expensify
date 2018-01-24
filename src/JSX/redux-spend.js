import {createStore, combineReducers} from 'redux'
import uuid from 'uuid'

const addSpending = ({description = '', note = '', amount = 0, createdAt = 0} = {}) => ({
  type: 'ADD_SPENDING',
  spending: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
})

const removeSpending = ({id} = {}) => ({
  type: 'REMOVE_SPENDING',
  id
})

const editSpending = (id, updates) => ({
  type: 'EDIT_SPENDING',
  id,
  updates
})

const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
})

const sortByDate = () => ({
  type: 'SORT_BY_DATE'
})

const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
})

const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
})

const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
})

// Spending Reducer
const spendingReducerDefaultState = []
const spendingReducer = (state = spendingReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_SPENDING':
      return [
        ...state,
        action.spending
      ]
    case 'REMOVE_SPENDING':
      return state.filter(({id}) => id !== action.id)
    case 'EDIT_SPENDING':
      return state.map((spending) => {
        if (spending.id === action.id) {
          return {
            ...spending,
            ...action.updates
          }
        } else {
          return spending
        }
      }
      )
    default:
      return state
  }
}

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      }
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      }
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }
    default:
      return state
  }
}

const getVisibleSpending = (spending, {text, sortBy, startDate, endDate}) => {
  return spending.filter((spending) => {

    const startDateMatch = typeof startDate !== 'number' || spending.createdAt >= startDate
    const endDateMatch = typeof endDate !== 'number' || spending.createdAt <= endDate
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

const store = createStore(
  combineReducers({
    spending: spendingReducer,
    filters: filtersReducer
  })
)
store.subscribe(() => {
  const state =store.getState()
  const visibleSpending = getVisibleSpending(state.spending, state.filters)
  console.log(visibleSpending)
})

const spendingOne = store.dispatch(addSpending({ description: 'Rent', amount: 100, createdAt: -21000 }))
const spendingTwo = store.dispatch(addSpending({ description: 'Coffee', amount: 300, createdAt: -1000 }))

// store.dispatch(removeSpending({id: spendingOne.spending.id}))
// store.dispatch(editSpending(spendingTwo.spending.id, {amount: 500}))

// store.dispatch(setTextFilter('rent'))
// store.dispatch(setTextFilter())

store.dispatch(sortByAmount())
// store.dispatch(sortByDate())

// store.dispatch(setStartDate())
// store.dispatch(setStartDate())
// store.dispatch(setEndDate(999))

const demoState = {
  spending: [{
    id: 'somthing',
    description: 'May Rent',
    note: 'This was the final payment for that address',
    amount: 1500,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
}
