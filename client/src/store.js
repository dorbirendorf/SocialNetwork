import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'  //  allows you to write action creators that return a function instead of an action (for async func like axios...)
import rootReducer from './reducers'

const initialState={}

const middelware=[thunk]

const store=createStore(
     rootReducer
    ,initialState
    ,composeWithDevTools(applyMiddleware(...middelware)))

export default store



