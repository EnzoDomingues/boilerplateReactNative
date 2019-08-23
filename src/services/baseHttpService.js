

import axios from 'axios';
import { storeBearerToken } from 'memenet/src/store/tokenLocalStore';
import Config from 'react-native-config';
import { getAuthorization, getEncodedString } from 'memenet/src/commons/utils';
import { registerErrorStack, registerLoginStack } from 'memenet/src/screens';
import Store from 'memenet/src/store';
import { deleteUser, clearLoggedUserOfflineToken } from 'memenet/src/actions';
import ErrorSceneType from 'memenet/src/config/error/errorSceneType';
import { Navigation } from 'react-native-navigation';

export default class BaseHttpService {
  constructor() {
    // Web Call timeout limit
    axios.defaults.timeout = 60000;

    this.header = {
      headers: {
        Authorization: `Bearer ${Store.getState().userReducer.bearerToken}`
      }
    };

    this.loginHeader = {
      headers: {
        Authorization: getAuthorization(),
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    };

    this.axiosResponseInterceptor();
  }

  // Methods Rest
  // Principals parameters:
  // url: Method URL
  // payload: parameters to send through call
  // removeBearerToken: when explicit defined, makes the call without the bearer token in the header
  get = (url, removeBearerToken) =>
    axios.get(url, !removeBearerToken && this.header);
  post = (url, payload, removeBearerToken) =>
    axios.post(url, payload, !removeBearerToken && this.header);
  postLogin = (url, payload) => axios.post(url, payload, this.loginHeader);
  put = (url, payload, removeBearerToken) =>
    axios.put(url, payload, !removeBearerToken && this.header);
  patch = (url, payload, removeBearerToken) =>
    axios.patch(url, payload, !removeBearerToken && this.header);
  _delete = (url, removeBearerToken) =>
    axios.delete(url, !removeBearerToken && this.header);
  axiosResponseInterceptor = async () =>
    axios.interceptors.response.use(
      response => {
        console.log('API SUCCESS', response);
        return response;
      },
      error => {
        console.log('API ERROR', error.response);
        if (error.code === 'ECONNABORTED') {
          Navigation.dismissAllModals();
          registerErrorStack(ErrorSceneType.SERVERERROR500);
        } else if (error.response.data.errors) {
          error.custom = {
            code: error.response.data.errors[0].code,
            message: error.response.data.errors[0].message
          };
        } else if (error.response.data) {
          error.custom = {
            code: error.response.data.code,
            message: error.response.data.message
          };
        } else if (!!error.response) {
          registerErrorStack(ErrorSceneType.SERVERERROR500);
        }
        switch (error.response.status) {
          case 401:
            Store.dispatch(deleteUser());
            Store.dispatch(clearLoggedUserOfflineToken());
            storeBearerToken(null);
            Navigation.dismissAllModals();
            registerLoginStack();
            //refreshToken(error)
            break;
          case 500:
            Navigation.dismissAllModals();
            registerErrorStack(ErrorSceneType.SERVERERROR500);
            break;
          default:
            return Promise.reject(error);
        }
      }
    );

  // Método para renovar token
  refreshToken = error => {
    // Resgata token do storage local
    retrieveBearerToken().then(refreshToken => {
      // Faz a chamada para renovar o token
      this.post(
        `${Config.API_ACCOUNTS_URL}/api/default/connect/token`,
        getEncodedString({
          grant_type: 'refresh_token',
          refresh_token: refreshToken.refresh_token
        }),
        this.loginHeader
      )
        .then(response => {
          // Caso sucesso, realiza o storage local do token
          storeBearerToken(response.data);
          Store.dispatch(saveBearerToken(response.access_token));

          // Modifica o header da requisição que falhou e a refaz
          error.config.headers.Authorization = `Bearer ${
            response.access_token
            }`;

          return axios.request(error);
        })
        .catch(() => {
          Store.dispatch(deleteUser());
          storeBearerToken(null);
          registerLoginStack();
        });
    });
  };
}
