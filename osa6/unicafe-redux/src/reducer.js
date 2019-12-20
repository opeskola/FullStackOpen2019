const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const goods = state.good + 1
      const goodState = {...state, good: goods}
      return goodState
    case 'OK':
      const oks = state.ok + 1
      const okState = {...state, ok: oks}
      return okState
    case 'BAD':
      const bads = state.bad + 1
      const badState = {...state, bad: bads}
      return badState
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer