import { boot } from 'quasar/wrappers';
import VueKeycloakJs from '../vue-keycloak-js'; // '@dsb-norge/vue-keycloak-js'; // '';@baloise/vue-keycloak
import { VueKeycloakInstance } from '@dsb-norge/vue-keycloak-js/dist/types';
import { Platform } from 'quasar';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $keycloak: VueKeycloakInstance;
  }
}
console.log(window.location.origin + '/silent-check-sso.html');
export default boot(({ app }) => {
  if (Platform.is.mobile) {
    console.log('Mobile Platform:', Platform.is);

    app.use(VueKeycloakJs, {
      init: {
        onLoad: 'login-required',
        adapter: 'capacitor-native',
        responseMode: 'fragment',
        redirectUri: `${process.env.VUE_APP_PACKAGE_ID}://home`,
      },
      config: {
        url: `${process.env.VUE_APP_KEYCLOAK_URL}`,
        clientId: `${process.env.VUE_APP_KEYCLOAK_CLIENT_ID}`,
        realm: `${process.env.VUE_APP_KEYCLOAK_REALM}`,
      },
    });
  } else {
    console.log('Web Platform', Platform.is);
    app.use(VueKeycloakJs, {
      init: {
        // adapter: 'capacitor-native',
        // responseMode: 'query',
        // redirectUri: 'ng-example://home',
        flow: 'standard', // default
        checkLoginIframe: false, // default
        // onLoad: 'login-required', // default
        //silentCheckSsoFallback: false,
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/silent-check-sso.html',
      },
      config: {
        url: `${process.env.VUE_APP_KEYCLOAK_URL}`,
        clientId: `${process.env.VUE_APP_KEYCLOAK_CLIENT_ID}`,
        realm: `${process.env.VUE_APP_KEYCLOAK_REALM}`,
      },
    });
  }
});
