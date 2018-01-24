const spendingReducerDefaultState = []

export default (state = spendingReducerDefaultState, action) => {
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
    case 'SET_SPENDING':
      return action.spending
    default:
      return state
  }
}
