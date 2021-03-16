function sunReducer(state = {sunrise: undefined, sunset: undefined}, action) {
    switch(action.type) {
        case 'SET_SUN':
            return { sunrise: action.payload.sunrise, sunset: action.payload.sunset}
        case 'SET_UNDEF':
            return { sunrise: 'Not Found', sunset: 'Not Found'}
        default:
            return state
    }
}

export default sunReducer;