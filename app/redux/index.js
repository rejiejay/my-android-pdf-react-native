import { combineReducers, createStore } from 'redux'

import pdf from './reducers/pdf'

const reducers = combineReducers({
    pdf
})

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store
