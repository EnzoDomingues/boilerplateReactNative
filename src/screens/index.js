import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { AnimationType } from './screenAnimations';

export const Screen = {
  // Generic
  // ErrorScene: 'generic.errorScene',
  // TransitionLoadingScene: 'generic.transitionLoadingScene',
  // TransitionScene: 'generic.transitionScene',

  // Login
  WelcomeLoginScene: 'login.welcomeLoginScene'
  // CPFScene: 'login.CPFScene',
  // PasswordScene: 'login.passwordScene',
  // BirthdayDateScene: 'login.birthdayDateScene',

  // Register Loyalty
  // RegisterLoyaltyUserDataScene: 'loyalty.register.registerLoyaltyUserDataScene',

  // // Esqueceu Senha
  // TemporaryPasswordSentScene: 'forgotPassword.temporaryPasswordSentScene',

  // //Help
  // HomeHelp: 'help.homeScene',
  // ContactScene: 'help.contactScene',
  // HelpSearchScene: 'help.searchScene',

  // // Home
  // HomeScene: 'loyalty.home',
  // HelperMenuScene: 'loyalty.helperMenu',
};

export const registerScreens = () => {
  // Generic
  // Navigation.registerComponent(
  //   Screen.ErrorScene,
  //   () => require('./generic/errorScene').default
  // );
  // Navigation.registerComponent(
  //   Screen.TransitionLoadingScene,
  //   () => require('./generic/transitionLoadingScene').default
  // );
  // Navigation.registerComponent(
  //   Screen.TransitionScene,
  //   () => require('./generic/transitionScene').default
  // );

  // Login
  Navigation.registerComponent(
    Screen.WelcomeLoginScene,
    () => require('./login/welcomeLoginScene').default
  );
  // Navigation.registerComponent(
  //   Screen.CPFScene,
  //   () => require('./login/CPFScene').default
  // );
  // Navigation.registerComponent(
  //   Screen.PasswordScene,
  //   () => require('./login/passwordScene').default
  // );
  // Navigation.registerComponent(
  //   Screen.BirthdayDateScene,
  //   () => require('./login/birthdayDateScene').default
  // );

  // Register Loyalty
  // Navigation.registerComponent(
  //   Screen.RegisterLoyaltyUserDataScene,
  //   () => require('./loyalty/register/registerLoyaltyUserDataScene').default
  // );

  // ForgotPassword
  // Navigation.registerComponent(
  //   Screen.TemporaryPasswordSentScene,
  //   () => require('./forgotPassword/temporaryPasswordSentScene').default
  // );

  // Home
  // Navigation.registerComponent(Screen.HomeScene, () =>
  //   gestureHandlerRootHOC(HomeScene)
  // );
  // Navigation.registerComponent(
  //   Screen.HelperMenuScene,
  //   () => require('./loyalty/menu/helperMenuScene').default
  // );
  // Navigation.registerComponent(
  //   Screen.DotzHomeReceiptScene,
  //   () => require('./loyalty/dotzReceipt/homeScene').default
  // );
  // Navigation.registerComponent(
  //   Screen.DotzFilterReceiptScene,
  //   () => require('./loyalty/dotzReceipt/filterScene').default
  // );
  // Navigation.registerComponent(
  //   Screen.DotzDetailReceiptScene,
  //   () => require('./loyalty/dotzReceipt/detailScene').default
  // );
};

export const registerLoginStack = () => {
  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
      drawBehind: true,
      animate: false
    },
    animations: {
      setRoot: AnimationType.FADEROOT,
      push: {
        waitForRender: Platform.OS === 'ios'
      },
      pop: {
        waitForRender: Platform.OS === 'ios'
      },
      showModal: {
        waitForRender: Platform.OS === 'ios'
      },
      dismissModal: {
        waitForRender: Platform.OS === 'ios'
      }
    },
    layout: {
      orientation: ['portrait']
    }
  });
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              id: Screen.WelcomeLoginScene,
              name: Screen.WelcomeLoginScene
            }
          }
        ]
      }
    }
  });
};

// export const registerRegisterLoyaltyStack = () => {
//   Navigation.setDefaultOptions({
//     topBar: {
//       visible: false,
//       drawBehind: true,
//       animate: false
//     },
//     animations: {
//       setRoot: AnimationType.FADEROOT,
//       push: {
//         waitForRender: Platform.OS === 'ios'
//       },
//       pop: {
//         waitForRender: Platform.OS === 'ios'
//       },
//       showModal: {
//         waitForRender: Platform.OS === 'ios'
//       },
//       dismissModal: {
//         waitForRender: Platform.OS === 'ios'
//       }
//     },
//     layout: {
//       orientation: ['portrait']
//     }
//   });
//   Navigation.setRoot({
//     root: {
//       stack: {
//         children: [
//           {
//             component: {
//               id: Screen.RegisterLoyaltyUserDataScene,
//               name: Screen.RegisterLoyaltyUserDataScene
//             },
//           }
//         ]
//       }
//     }
//   });
// };

// export const registerHomeStack = animationType => {
//   Navigation.setDefaultOptions({
//     topBar: {
//       visible: false,
//       drawBehind: true,
//       animate: false
//     },
//     animations: {
//       setRoot: animationType,
//       push: {
//         waitForRender: Platform.OS === 'ios'
//       },
//       pop: {
//         waitForRender: Platform.OS === 'ios'
//       },
//       showModal: {
//         waitForRender: Platform.OS === 'ios'
//       },
//       dismissModal: {
//         waitForRender: Platform.OS === 'ios'
//       }
//     },
//     layout: {
//       orientation: ['portrait']
//     }
//   });

//   Navigation.setRoot({
//     root: {
//       stack: {
//         children: [
//           {
//             component: {
//               id: Screen.HomeScene,
//               name: Screen.HomeScene
//             }
//           }
//         ]
//       }
//     }
//   });
// };

// export const registerErrorStack = errorType => {
//   Navigation.setDefaultOptions({
//     topBar: {
//       visible: false,
//       drawBehind: true,
//       animate: false
//     },
//     animations: {
//       setRoot: AnimationType.FADEROOT,
//       push: {
//         waitForRender: Platform.OS === 'ios'
//       },
//       pop: {
//         waitForRender: Platform.OS === 'ios'
//       },
//       showModal: {
//         waitForRender: Platform.OS === 'ios'
//       },
//       dismissModal: {
//         waitForRender: Platform.OS === 'ios'
//       }
//     },
//     layout: {
//       orientation: ['portrait']
//     }
//   });
//   Navigation.setRoot({
//     root: {
//       component: {
//         id: Screen.ErrorScene,
//         name: Screen.ErrorScene,
//         passProps: { errorType }
//       }
//     }
//   });
// };

// import { Navigation } from 'react-native-navigation';

// export const registerScreens = () => {
//     Navigation.registerComponent('login.CPFScene', () => require('./login/CPFScene').default);
//     Navigation.registerComponent('login.WelcomeLoginScene', () => require('./login/welcomeLoginScene').default);
// };

// export const registerLoginStack = () => {
//     Navigation.setDefaultOptions({
//         topBar: {
//             visible: false,
//             drawBehind: true,
//             animate: false
//         }
//     });
//     Navigation.setRoot({
//         root: {
//             stack: {
//                 children: [{
//                     component: {
//                         name: "login.CPFScene"
//                     },
//                     component: {
//                         name: "login.WelcomeLoginScene"
//                     }
//                 }]
//             }
//         }
//     });
// }
