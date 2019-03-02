import axios from 'axios';
import {
  FETCH_USER,
  FETCH_BOOTS,
  FETCH_BOOT,
  FETCH_REVIEW,
  FETCH_USER_REVIEWS,
  FETCH_REVIEWS,
  SUBMIT_REVIEW_MESSAGE_SUCCESS,
  SUBMIT_REVIEW_MESSAGE_ERROR,
  SUBMIT_REVIEW_EDIT_MESSAGE_SUCCESS,
  SUBMIT_REVIEW_EDIT_MESSAGE_ERROR,
  ERROR_DELETE_REVIEW,
  SUCCESSFUL_DELETE_REVIEW,
  SIGNUP_MESSAGE_ERROR,
  SIGNUP_MESSAGE_SUCCESS,
  PAYMENT_MESSAGE_ERROR,
  PAYMENT_MESSAGE_SUCCESS,
  LOGIN_MESSAGE_ERROR,
  LOGIN_MESSAGE_SUCCESS,
  UPDATE_MESSAGE_ERROR,
  UPDATE_MESSAGE_SUCCESS,
  CLEAR_MESSAGE,
  CUSTOM_MESSAGE
} from './types';

export const fetchUser = () => async dispatch => {
  //get
  const response = await axios.get('/api/active_user');
  //then (res is our response/res.data is our user model)
  dispatch({ type: FETCH_USER, payload: response.data });
};

//gets all specific boots from a brand name (bootRoutes)(multiple)
export const fetchBoots = bootbrand => async dispatch => {
  const response = await axios.get('/api/boots/' + bootbrand);

  dispatch({ type: FETCH_BOOTS, payload: response.data });
};

//get a specific type of boot(single)
export const fetchBoot = (bootbrand, bootname) => async dispatch => {
  const response = await axios.get('/api/boots/' + bootbrand + '/' + bootname);

  dispatch({ type: FETCH_BOOT, payload: response.data });
};

//get all reviews for boot(MULTIPLE)
export const fetchReviews = (bootbrand, bootname) => async dispatch => {
  const response = await axios.get('/api/reviews/' + bootbrand + '/' + bootname);

  dispatch({ type: FETCH_REVIEWS, payload: response.data });
};

//get all user reviews via user_id
export const fetchUserReviews = () => async dispatch => {
  const response = await axios.get('/api/user/reviews/');

  dispatch({ type: FETCH_USER_REVIEWS, payload: response.data });
};

//get a single review for boot(SINGLE)(reviewRoutes)
export const fetchReview = reviewID => async dispatch => {
  const response = await axios.get('/api/reviews/' + reviewID);

  dispatch({ type: FETCH_REVIEW, payload: response.data });
};

export const submitReview = (review, callback) => async dispatch => {
  try {
    const request = await axios.post('/api/reviews/', review);

    if (request) {
      callback();
      dispatch({ type: SUBMIT_REVIEW_MESSAGE_SUCCESS });
    }
  } catch (e) {
    dispatch({ type: SUBMIT_REVIEW_MESSAGE_ERROR });
  }
};

export const editReview = (review, callback) => async dispatch => {
  try {
    const request = await axios.post('/api/reviews/edit', review);

    if (request) {
      callback();
      dispatch({ type: SUBMIT_REVIEW_EDIT_MESSAGE_SUCCESS });
    }
  } catch (e) {
    dispatch({ type: SUBMIT_REVIEW_EDIT_MESSAGE_ERROR });
  }
};

export const deleteReview = (bootname, id, callback) => async dispatch => {
  console.log('in index ', bootname);
  try {
    const request = await axios.delete('/api/delete/' + bootname + '/' + id);

    if (request) {
      callback();
      dispatch({ type: SUCCESSFUL_DELETE_REVIEW });
    }
  } catch (e) {
    dispatch({ type: ERROR_DELETE_REVIEW });
  }
};

export const createUser = (values, callback) => async dispatch => {
  try {
    const request = await axios.post('/api/createaccount', values);
    if (request) {
      dispatch({ type: FETCH_USER, payload: request.data });
      callback();
      dispatch({ type: SIGNUP_MESSAGE_SUCCESS });
    }
  } catch (e) {
    dispatch({ type: SIGNUP_MESSAGE_ERROR });
  }
};

export const clearMessage = () => dispatch => dispatch({ type: CLEAR_MESSAGE });

export const customMessage = message => dispatch =>
  dispatch({ type: CUSTOM_MESSAGE, payload: message });

//for async valid email check(before submit)
export async function asyncValidate(values) {
  try {
    const request = await axios.post('/api/createaccount1', values);
    if (request) {
      console.log('Async Request Success');
    }
  } catch (e) {
    // throw { email: 'That email already exists' };
    console.log(e);
  }
}

//login async request
export const loginUser = (values, callback) => async dispatch => {
  try {
    const request = await axios.post('/api/login', values);
    if (request) {
      dispatch({ type: FETCH_USER, payload: request.data });
      callback();
      dispatch({ type: LOGIN_MESSAGE_SUCCESS });
    }
  } catch (e) {
    dispatch({ type: LOGIN_MESSAGE_ERROR });
  }
};

//updating the user info
export const updateUser = (values, callback) => async dispatch => {
  try {
    const request = await axios.post('/api/update', values);
    if (request) {
      dispatch({ type: FETCH_USER, payload: request.data });
      callback();
      dispatch({ type: UPDATE_MESSAGE_SUCCESS });
    }
  } catch (e) {
    dispatch({ type: UPDATE_MESSAGE_ERROR });
  }
};

//updating the user info
export const updateAvatar = (data, callback) => async dispatch => {
  try {
    const request = await axios.post('/api/updateAvatar', data);
    if (request) {
      dispatch({ type: FETCH_USER, payload: request.data });
      callback();
      dispatch({ type: UPDATE_MESSAGE_SUCCESS });
    }
  } catch (e) {
    dispatch({ type: UPDATE_MESSAGE_ERROR });
  }
};

//handling payment tokens
export const grabStripeToken = token => async dispatch => {
  try {
    const request = await axios.post('/api/payment', token);
    if (request) {
      dispatch({ type: FETCH_USER, payload: request.data });
      dispatch({ type: PAYMENT_MESSAGE_SUCCESS });
    }
  } catch (e) {
    dispatch({ type: PAYMENT_MESSAGE_ERROR });
  }
};

//relative path
// old way action creator
//const request = axios.get('./active_user');
//return { type: FETCH_USER etc..}

//with redux thunk will attach a dispatch
//call when we call this api request
//axios returns a promise and once that gets resolved
//we dispatch a function and sent to reducers
