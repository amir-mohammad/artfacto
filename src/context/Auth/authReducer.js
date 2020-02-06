import {LOGIN_USERADMIN,LOGOUT_USERADMIN} from '../types';

export default (state,action) =>{
    switch(action.type){
        case LOGIN_USERADMIN:
            return{
                ...state,
                user:action.payload
            }
        case LOGOUT_USERADMIN:
            return{
                ...state,
                user:null
            }    
    }
}