import { Navigation } from 'react-native-navigation';
import {
  registerScreens,
  registerLoginStack,
  registerExampleStack,
  registerHomeStack
} from 'memenet/src/screens';
import {
  retrieveBearerToken,
  retrieveUserData,
  retrieveOfflineTokens
} from 'memenet/src/store/tokenLocalStore';
import Store from 'memenet/src/store';
import {
  saveBearerToken,
  saveUserLoginData,
  deleteWalletData,
  saveComplementationData,
  saveOfflineTokens
} from 'memenet/src/actions';
import { AnimationType } from 'memenet/src/screens/screenAnimations';

// Registra as telas no navigation
registerScreens();

// Inicializa a pilha das telas de login
Navigation.events().registerAppLaunchedListener(() => {
  retrieveBearerToken().then(token => {
    if (token) {
      Store.dispatch(saveBearerToken(token.access_token));
      retrieveUserData().then(userData => {
        Store.dispatch(saveUserLoginData(userData));
        Store.dispatch(saveComplementationData(userData));
        Store.dispatch(deleteWalletData());
        setTimeout(() => registerHomeStack(AnimationType.FADEROOT), 300);
      });
    } else {
      registerLoginStack();
    }
  });
});
