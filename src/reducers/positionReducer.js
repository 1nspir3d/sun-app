function positionReducer(
    state = {
        lat: undefined,
        lon: undefined
    }, 
    action) {
    switch(action.type) {
        case 'SET_POSITION':
            return { lon: action.payload.lon, lat: action.payload.lat};
        case 'SET_UNDEF':
            return {lon: 'Not Found', lat: 'Not Found'}
        default:
            return state;
    }
}

export default positionReducer;