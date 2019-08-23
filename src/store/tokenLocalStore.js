import AsyncStorage from '@react-native-community/async-storage';

const BEARER_TOKEN_STORE_KEY = 'bearerTokenStoreKey';
const USER_DATA_STORE_KEY = 'userDataStoreKey';
const OFFLINE_TOKEN_KEY = 'offlineTokenKey';
const USER_HAS_ACCESSED_WALLET = 'userHasAccessedWallet';

export const storeBearerToken = async bearerToken =>
  await AsyncStorage.setItem(
    BEARER_TOKEN_STORE_KEY,
    JSON.stringify(bearerToken)
  );

export const storeUserData = async userData =>
  await AsyncStorage.setItem(USER_DATA_STORE_KEY, JSON.stringify(userData));

export const storeOfflineTokens = async tokens =>
  await AsyncStorage.setItem(OFFLINE_TOKEN_KEY, JSON.stringify(tokens));

export const storeUserHasAccessedWallet = async () =>
  await AsyncStorage.setItem(USER_HAS_ACCESSED_WALLET, 'done');

export const retrieveBearerToken = async () => {
  const value = await AsyncStorage.getItem(BEARER_TOKEN_STORE_KEY);
  return value !== null ? JSON.parse(value) : null;
};

export const retrieveUserData = async () => {
  const value = await AsyncStorage.getItem(USER_DATA_STORE_KEY);
  return value !== null ? JSON.parse(value) : null;
};

export const retrieveOfflineTokens = async () => {
  const value = await AsyncStorage.getItem(OFFLINE_TOKEN_KEY);
  return value !== null ? JSON.parse(value) : null;
};

export const retrieveUserHasAccessedWallet = async () => {
  const value = await AsyncStorage.getItem(USER_HAS_ACCESSED_WALLET);
  return value !== null ? value : null;
};
