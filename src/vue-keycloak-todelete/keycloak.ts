//import Keycloak from 'keycloak-ionic';
import Keycloak from 'keycloak-js';

import { hasFailed, isAuthenticated, isPending, setToken } from './state';
import { isNil } from './utils';

type KeycloakInstance = Keycloak.KeycloakInstance | undefined;

let $keycloak2: KeycloakInstance = undefined;

export async function isTokenReady(): Promise<void> {
  return new Promise((resolve) => checkToken(resolve));
}

const checkToken = (resolve: () => void) => {
  if (!isNil($keycloak2) && !isNil($keycloak2?.token)) {
    resolve();
  } else {
    setTimeout(() => checkToken(resolve), 500);
  }
};

export function getKeycloak(): Keycloak.KeycloakInstance {
  return $keycloak2 as Keycloak.KeycloakInstance;
}

export async function getToken(): Promise<string> {
  return updateToken();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function isLoggedIn(this: any): Promise<boolean> {
  try {
    if (!$keycloak2?.authenticated) {
      return false;
    }
    await this.updateToken();
    return true;
  } catch (error) {
    return false;
  }
}

export async function updateToken(): Promise<string> {
  if (!$keycloak2) {
    throw new Error('Keycloak is not initialized.');
  }

  try {
    await $keycloak2.updateToken(10);
    setToken($keycloak.token as string);
  } catch (error) {
    hasFailed(true);
    throw new Error('Failed to refresh the token, or the session has expired');
  }
  return $keycloak2.token || '';
}

export function createKeycloak(
  config: Keycloak.KeycloakConfig | string
): Keycloak.KeycloakInstance {
  $keycloak2 = Keycloak(config);
  return getKeycloak();
}

export async function initKeycloak(
  initConfig: Keycloak.KeycloakInitOptions
): Promise<void> {
  try {
    isPending(true);
    const _isAuthenticated = await $keycloak2?.init(initConfig);
    isAuthenticated(_isAuthenticated || false);
    if (!isNil($keycloak2?.token)) {
      setToken($keycloak2?.token as string);
    }

    if ($keycloak2) {
      $keycloak2.onAuthRefreshSuccess = () =>
        setToken($keycloak2?.token as string);
      $keycloak2.onTokenExpired = () => updateToken();
    }
  } catch (error) {
    hasFailed(true);
    isAuthenticated(false);
    throw new Error('Could not read access token');
  } finally {
    isPending(false);
  }
}
