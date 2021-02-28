import Http from '../utils/Http';
import {authLogin} from '../store/userSlice';
import {setLoading} from '../store/loaderSlice';

/**
 * Fetch all users
 *
 * @param params
 * @returns {function(*)}
 */
export function login(params) {
  return dispatch => {
    dispatch(setLoading(true));
    return new Promise((resolve, reject) => {
      Http.post('auth/login', params)
        .then(res => {
          const {token} = res.data;
          dispatch(authLogin(token))
          resolve(res);
        })
        .catch(err => {
          reject(err);
        })
        .finally(() => {
          dispatch(setLoading(false));
        })
    })
  }
}

/**
 * Register new user
 *
 * @param params
 * @returns {function(*)}
 */
export function register(params) {
  return dispatch => {
    dispatch(setLoading(true));
    return new Promise((resolve, reject) => {
      Http.post('auth/register', params)
        .then(res => {
          const {token} = res.data;
          dispatch(authLogin(token));
          resolve(res);
        })
        .catch(err => {
          reject(err);
        })
        .finally(() => {
          dispatch(setLoading(false));
        })
    })
  }
}

/**
 * Reset user password
 *
 * @param params
 * @returns {function(*)}
 */
export function resetPassword(params) {
  return () => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      Http.post('auth/reset-password', params)
        .then((res) => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        })
        .finally(() => {
          setLoading(false);
        })
    })
  }
}

/**
 * Forgot user password
 *
 * @param params
 * @returns {function(*)}
 */
export function forgotPassword(params) {
  return () => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      Http.post('auth/forgot-password', params)
        .then((res) => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        })
        .finally(() => {
          setLoading(false);
        })
    })
  }
}
