import {GET_POSTS, POST_ERROR,GET_POST} from '../actions/types'

const initialState={
    posts:[],
    post: null,
    loading:true,
    erros:{}

}

export default function(state=initialState,action){
    const {type,payload}=action

    switch(type){
        case GET_POSTS:
            return{
                ...state,
                posts:action.payload,
                loading:false
            }
            case GET_POST:
                return{
                    ...state,
                    post:action.payload,
                    loading:false
                }
        case POST_ERROR:
            return{
                ...state,
                error:action.payload,
                loading:false
            }
        default:
            return state
    }
}