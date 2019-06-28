import axios from "axios";
import setAuthToken from '../utils/setAuthToken'

export const login = async (dispatch, payload) => {
  axios
    .post('/auth/login', payload)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)

      setAuthToken(`Bearer ${token}`)

      window.location.href = '/dashboard'

      return dispatch({
        type: 'LOGIN',
        payload: res.data
      })
    })
    .catch(err => {
      return dispatch({
        type: 'GET_ERROR',
        payload: err.response.data
      })
    });
};

export const signup = (dispatch, payload) => {
  axios
    .post('/auth/signup', payload)
    .then(res => {
      return dispatch({
        type: 'SIGNUP',
        payload: res.data
      })
    })
    .catch(err => {
      return dispatch({
        type: 'SET_ERROR',
        payload: err.response.data
      })
    })
}

export const logoutUser = (dispatch) => {
  localStorage.removeItem('jwtToken')

  setAuthToken(false)

  return dispatch({
    type: 'LOGOUT'
  })
} 
