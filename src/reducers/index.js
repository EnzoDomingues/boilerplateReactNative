import { combineReducers } from 'redux';
import UserReducer from './userReducer';
import RequestsReducer from './requestsReducer';

export default combineReducers({
  userReducer: UserReducer,
  requestsReducer: RequestsReducer
});
