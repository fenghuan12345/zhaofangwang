const defaultState = {
    name: 'hello ketty',
    detail:[]
}

export default (state = defaultState, action) => {
    if(action.type === 'CHGNAME') {
        let newState = {...state}
        newState.name = action.value
        return newState
    }

    if(action.type === 'GETDETAIL'){
        let newState = JSON.parse(JSON.stringify(state))
        newState.detail = action.value
        return newState
    }
    return state
}
