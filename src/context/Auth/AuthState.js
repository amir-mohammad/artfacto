import React ,{useReducer} from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import AuthContext from './authContext';
import {LOGIN_USERADMIN,LOGOUT_USERADMIN} from '../types';
import jwtDecode from 'jwt-decode';

const AuthState = (props) =>{
    const initialState = {
        user:null
    }

    const [state,dispatch] = useReducer(authReducer,initialState);
    if(localStorage.getItem('userAdminToken')){
       const decodeToken = jwtDecode(localStorage.getItem('userAdminToken'));
       if(decodeToken.exp * 1000 < Date().now){
        localStorage.removeItem('userAdminToken');
       }
       else{
           initialState.user = decodeToken;
       }
    }

    const login = (userData) =>{
        console.log(userData);
        localStorage.setItem('userAdminToken',userData.token);
        dispatch({
            type:LOGIN_USERADMIN,
            payload:userData,
        })
    }

    const logout = () => {
        localStorage.removeItem('userAdminToken');
        dispatch({
            type:LOGOUT_USERADMIN
        })
    }


    return(<AuthContext.Provider value={{
        user:state.user,
        login,
        logout
    }}>
        {props.children}
    </AuthContext.Provider>)


}

export default AuthState;
