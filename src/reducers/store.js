import positionReducer from './positionReducer';
import sunReducer from './sunReducer';
import cityReducer from './cityReducer';
import inputReducer from './inputReducer';
import {createStore, combineReducers} from 'redux';

const reducers = combineReducers({
    positionReducer,
    sunReducer,
    cityReducer,
    inputReducer,
})

const configureStore = () => createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default configureStore;