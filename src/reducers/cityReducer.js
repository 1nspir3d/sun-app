function cityReducer(state = '', action) {
    switch(action.type) {
        case 'SET_CITY': 
            return action.payload
        case 'SET_UNDEF':
            return 'Not Found'
        default: 
            return state
    }
}

export default cityReducer;