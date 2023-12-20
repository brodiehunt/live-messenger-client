export default function stateReducer(state, action) {
  switch(action.type) {
    case "setUser": {
      return {
        ...state,
        user: action.data,
      }
    }
    default: 
    return state;
  }
}