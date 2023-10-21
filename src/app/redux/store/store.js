import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from '../reducer/reducer'

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store