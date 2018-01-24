import configureMockStroe from 'redux-mock-store'
import thunk from 'redux-thunk'
import {startAddSpending, addSpending, editSpending, removeSpending, setSpending, startSetSpending, startRemoveSpending, startEditSpending} from '../../actions/spending'
import spending from '../fixtures/spending'
import database from '../../firebase/firebase'

const createMockStore = configureMockStroe([thunk])

beforeEach((done) => {
  const spendingData = {}
  spending.forEach(({id, description, note, amount, createdAt}) => {
    spendingData[id] = {description, note,amount, createdAt}
  })

  database.ref('spending').set(spendingData).then(() => done())
})
test('Should test remove spending object', () => {
  const action = removeSpending({id: '123abc'})
  expect(action).toEqual({
    type: 'REMOVE_SPENDING',
    id: '123abc'
  })
})

test('Should remove spending from firebase', (done) => {
  const store = createMockStore({})
  const id = spending[2].id
  store.dispatch(startRemoveSpending({id})).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'REMOVE_SPENDING',
      id
    })
    return database.ref(`spending/${id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy()
    done()
  })
})

test('Sould test edit spending object', () => {
  const action = editSpending('123abc', {note: 'New note value'})
  expect(action).toEqual({
    type: 'EDIT_SPENDING',
    id: '123abc',
    updates: {
      note: 'New note value'
    }
  })
})

test('Should edit spending from firebase', (done) => {
  const store = createMockStore({})
  const id = spending[0].id
  const updates = {amount: 21045}
  store.dispatch(startEditSpending(id, updates)).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'EDIT_SPENDING',
      id,
      updates
    })
    return database.ref(`spending/${id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val().amount).toBe(updates.amount)
    done()
  })
})

test('Should test add spending object', () => {
  const action = addSpending(spending[2])
  expect(action).toEqual({
    type: 'ADD_SPENDING',
    spending: spending[2]
  })
})

test('Should add spending to database and store', () => {
  const store = createMockStore({})
  const spendingData = {
    description: 'Laptop',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  }
  store.dispatch(startAddSpending(spendingData)).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'ADD_SPENDING',
      spending: {
        id: expect.any(String),
        ...spendingData
      }
    })

    return database.ref(`spending/${actions[0].spending.id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(spendingData)
    done()
  })
})

test('Should add spending with defaults to database and store', () => {
  const store = createMockStore({})
  const spendingData = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0
  }
  store.dispatch(startAddSpending({})).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'ADD_SPENDING',
      spending: {
        id: expect.any(String),
        ...spendingData
      }
    })

    return database.ref(`spending/${actions[0].spending.id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(spendingData)
    done()
  })
})

test('Should setup set spending action with data', () => {
  const action = setSpending(spending)
  expect(action).toEqual({
    type: 'SET_SPENDING',
    spending
  })
})

test('Should fetch the spending from firebase', () => {
  const store = createMockStore({})
  store.dispatch(startSetSpending()).then(() => {
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: 'SET_SPENDING',
      spending
    })
    done()
  })
})
