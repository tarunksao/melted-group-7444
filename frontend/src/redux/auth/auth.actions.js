import axios from "axios";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./auth.types";


export const userLogin = (creeds) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try{
    let response = await axios.post('https://cyan-breakable-antelope.cyclic.app/users/login', creeds);
    let data = await response.data;
    console.log('user login Data:', data);
    axios.defaults.headers.common["Authorization"] = data.token;
    localStorage.setItem('token', data.token);
    dispatch({type:LOGIN_SUCCESS, payload:data});
    return data;
  } catch (e) {
    console.log(e);
    dispatch({type:LOGIN_FAILURE});
  }
};

export const userRegister = (creeds) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    try{
      let response = await axios.post('https://cyan-breakable-antelope.cyclic.app/users/register', creeds);
      let data = await response.data;
      console.log('user register Data:', data);
      dispatch({type:REGISTER_SUCCESS, payload:data});
      return data;
    } catch (e) {
      console.log(e);
      dispatch({type:REGISTER_FAILURE});
    }
};

export const userLogout = () => async (dispatch) => {
    try{
        let response = await axios.get('https://cyan-breakable-antelope.cyclic.app/users/logout');
        let data = await response.data;
        console.log('User Logout Data:', data);
        localStorage.removeItem('token');
        dispatch({type:LOGOUT});
        
    } catch (e) {
        console.log(e);
    }

}
