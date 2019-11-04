const defaultState = {
    name: 'hello ketty'
}

export default (state = defaultState, action) => {
    if(action.type === 'CHGNAME') {
        let newState = {...state}
        newState.name = action.value
        return newState
    }
    return state
}