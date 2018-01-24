import spendingReducer from '../../reducers/spending'
import spending from '../fixtures/spending'

test('Should test default state', () => {
  const state = spendingReducer(undefined, {type: '@@INIT'})
  expect(state).toEqual([])
})

test ('Should remove spending by id', () => {
  const action = {
    type: 'REMOVE_SPENDING',
    id: spending[1].id
  }
  const state = spendingReducer(spending, action)
  expect(state).toEqual([spending[0], spending[2]])
})

test ('Should not remove spending if id not found', () => {
  const action = {
    type: 'REMOVE_SPENDING',
    id: '-1'
  }
  const state = spendingReducer(spending, action)
  expect(state).toEqual(spending)
})

test('Should add a spending', () => {
  const spending = {
    id: '109',
    description: 'Car',
    createdAt: 20000,
    amount: 32330
  }
  const action = {
    type: 'ADD_SPENDING',
    spending
  }
  const state = spendingReducer( spending, action)
  expect(state).toEqual([...spending, spending])
})

test('Should edit a spending', () => {
  const amount = 122000
  const action = {
    type: 'EDIT_SPENDING',
    id: spending[1].id,
    updates: {
      amount
    }
  }
  const state = spendingReducer(spending, action)
  expect(state[1].amount).toBe(amount)
})

test('Should not edit a spending if a id not found', () => {
  const amount = 122000
  const action = {
    type: 'EDIT_SPENDING',
    id: '-1',
    updates: {
      amount
    }
  }
  const state = spendingReducer(spending, action)
  expect(state).toEqual(spending)
})

test('Should set spending', () => {
  const action = {
    type: 'SET_SPENDING',
    spending: [spending[1]]
  }
  const state = spendingReducer(spending, action)
  expect(state).toEqual([spending[1]])
})