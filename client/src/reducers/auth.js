import{REGISTER_FAIL,REGISTER_SUCCESS,AUTH_ERROR,USER_LOADED,LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT} from '../actions/types'

const initialState={
    token: localStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
    user:null
}

export default function (state=initialState,action){
    const {type,payload}=action

    switch(action.type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token)
            return{
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
            localStorage.removeItem('token')
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false,
            }
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                loading:false,
                user:payload

            }
            case LOGOUT:
                return {
                  ...state,
                  token: null,
                  isAuthenticated: false,
                  loading: false,
                  user: null
                };
        default:
            return state

    }
}