//combined reducers
import {combineReducers} from 'redux';
import authorizedReducer from './authorizeReducer';
import errorReducer from './errorReducer';
import bootListReducer from './bootListReducer';
import reviewReducer from './reviewReducer';
import userReviewReducer from './userReviewReducer';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
  authorizedUser: authorizedReducer,
  error: errorReducer,
  activeBootList: bootListReducer,
  activeReviewList: reviewReducer,
  activeUserReviewList: userReviewReducer,
  form: formReducer
});
