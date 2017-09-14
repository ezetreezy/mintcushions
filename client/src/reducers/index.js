//combined reducers
import {combineReducers} from 'redux';
import authorizedReducer from './authorizeReducer';
import errorReducer from './errorReducer';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
  authorizedUser: authorizedReducer,
  error: errorReducer,
  form: formReducer
});
