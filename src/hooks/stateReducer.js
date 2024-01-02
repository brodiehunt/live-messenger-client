export default function stateReducer(state, action) {
  switch(action.type) {
    case "setUser": {
      return {
        ...state,
        user: action.data,
      }
    }
    case 'setRequests': {
      return {
        ...state,
        newRequests: action.data
      }
    }
    case 'setConversations': {
      return {
        ...state,
        conversations: action.data
      }
    }
    case 'addConversation': {
      const newConversations = [...state.conversations, action.data];
      return {
        ...state,
        conversations: newConversations
      }
    }
    default: 
    return state;
  }
}