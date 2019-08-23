import {
  GET_REQUESTS
} from '../actions/actionTypes';

const INITIAL_STATE = {
  data: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case GET_REQUESTS:
        return {
          ...state,
          data: action.payload,
        };
      default:
        return { ...state };
  }
};
