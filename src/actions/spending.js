import uuid from 'uuid'
import database from '../firebase/firebase'

export const addSpending = (spending) => ({
  type: 'ADD_SPENDING',
  spending
})

export const startAddSpending = (spendingData = {}) => {
  return (dispatch) => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = spendingData
    const spending = {description, note, amount, createdAt}

    return database.ref('spending').push(spending).then((ref) => {
      dispatch(addSpending({
        id: ref.key,
        ...spending
      }))
    })
  }
}

export const removeSpending = ({id} = {}) => ({
  type: 'REMOVE_SPENDING',
  id
})

export const startRemoveSpending = ({id} = {}) => {
  return (dispatch) => {
    return database.ref(`spending/${id}`).remove().then(() => {
      dispatch(removeSpending({id}))
    })
  }
}

export const editSpending = (id, updates) => ({
  type: 'EDIT_SPENDING',
  id,
  updates
})

export const startEditSpending = (id, updates) => {
  return (dispatch) => {
    return database.ref(`spending/${id}`).update(updates).then(() => {
      dispatch(editSpending(id, updates))
    })
  }
}

export const setSpending = (spending) => ({
  type: 'SET_SPENDING',
  spending
})

export const startSetSpending = () => {
  return (dispatch) => {
    return database.ref('spending').once('value').then((snapshot) => {
      const spending = []

      snapshot.forEach((childSnapshot) => {
        spending.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      })
      dispatch(setSpending(spending))
    })
  }
}
