const defaultState = {
    detail:[],
    cityList:[],
    localCity:'北京'
}

export default (state = defaultState, action) => {
    if(action.type === 'getCityList') {
        let newState = {...state}
        newState.cityList = action.value
        return newState
    }
    if(action.type === 'getLocalCity') {
        let newState = {...state}
        newState.localCity = action.value
        return newState
    }

    if(action.type === 'GETDETAIL'){
        let newState = JSON.parse(JSON.stringify(state))
        newState.detail = action.value
        return newState
    }
    return state
}
