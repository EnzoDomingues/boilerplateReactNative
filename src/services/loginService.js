
import BaseHttpService from './baseHttpService';
import Config from 'react-native-config';
import { encodeBase64, getEncodedString } from 'memenet/src/commons/utils';

export default class LoginService extends BaseHttpService {
  constructor(props) {
    super(props);
  }
  // Chamada que identifica se o usuário já está cadastrado na dotz ou não
  getUserByDocument = document =>
    this.get(
      `${Config.API_ACCOUNTS_URL}/api/default/accounts/${document}`,
      true
    );

  verifyUserStatus = document =>
    this.get(
      `${Config.API_ACCOUNTS_URL}/api/default/v3/status/${document}`,
      true
    );

  login = (username, password, birthday) =>
    this.postLogin(
      `${Config.API_ACCOUNTS_URL}/api/default/connect/token`,
      getEncodedString({
        grant_type: 'password',
        scope: Config.API_SCOPE,
        username,
        password: encodeBase64(password),
        birthday
      })
    );
}
