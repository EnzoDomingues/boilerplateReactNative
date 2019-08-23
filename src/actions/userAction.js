import {
    USER_SAVE_LOGIN_DATA_ACTION,
    USER_SAVE_COMPLEMENTATION_DATA_ACTION,
    USER_DELETE_ACTION,
    USER_SAVE_PASSWORD_ACTION,
    USER_SAVE_TOKEN_ACTION,
    USER_SAVE_TEMP_PASS_DATA_ACTION,
    USER_SAVE_IS_PAYMENTS,
    USER_SAVE_REGISTER_DATA_ACTION
} from './actionTypes';

export const saveUserLoginData = payload => ({
  type: USER_SAVE_LOGIN_DATA_ACTION,
  payload
});

export const saveUserTempPassData = payload => ({
  type: USER_SAVE_TEMP_PASS_DATA_ACTION,
  payload
});

export const saveUserRegisterData = payload => ({
  type: USER_SAVE_REGISTER_DATA_ACTION,
  payload
});

export const saveComplementationData = payload => ({
  type: USER_SAVE_COMPLEMENTATION_DATA_ACTION,
  payload
});

export const saveUserPassword = payload => ({
  type: USER_SAVE_PASSWORD_ACTION,
  payload
});

export const saveBearerToken = payload => ({
  type: USER_SAVE_TOKEN_ACTION,
  payload
});

export const saveUserIsPayments = payload => ({
    type: USER_SAVE_IS_PAYMENTS,
    payload
});

export const deleteUser = () => ({
  type: USER_DELETE_ACTION
});
