import { boot } from 'quasar/wrappers';
//import Keycloak from 'keycloak-ionic';
//import { ref } from 'vue';
//import { vueKeycloak } from '../vue-keycloak/plugin';
import VueKeycloakJs from '../vue-keycloak-js'; // '@dsb-norge/vue-keycloak-js'; // '';@baloise/vue-keycloak
import { VueKeycloakInstance } from '@dsb-norge/vue-keycloak-js/dist/types';
//import { useKeycloakStore } from '../stores/keycloak-store';

/*declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $keycloak: Keycloak.KeycloakInstance;
  }
}

const keycloak = Keycloak({
  url: `${process.env.VUE_APP_KEYCLOAK_URL}`,
  clientId: `${process.env.VUE_APP_KEYCLOAK_CLIENT_ID}`,
  realm: `${process.env.VUE_APP_KEYCLOAK_REALM}`,
});

keycloak.onAuthSuccess = () => {
  console.log('login keycloak');
  console.log(keycloak);
  // this.authSuccess = true;
  // this.changeRef.detectChanges();
};
keycloak.onAuthLogout = () => {
  console.log('logout keycloak');
  console.log(keycloak);
};

keycloak.onReady = (authenticated) => {
  console.log('Keycloak ready mobile:', authenticated);
  console.log(keycloak);
  const keycloakStore = useKeycloakStore();
  keycloakStore.setKeyCloak(keycloak);
};
*/
//import VueKeycloakJs from '@dsb-norge/vue-keycloak-js';
//import { KeycloakInstance } from 'keycloak-js';
//import { VueKeycloakInstance } from '@dsb-norge/vue-keycloak-js/dist/types';
//import { Platform } from 'quasar';
// Allow usage of this.$keycloak in components
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $keycloak: VueKeycloakInstance;
  }
}
console.log(window.location.origin + '/silent-check-sso.html');
export default boot(({ app }) => {
  app.use(VueKeycloakJs, {
    initOptions: {
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

  /* if (Platform.is.mobile) {
    keycloak.init({
      adapter: 'capacitor-native',
      responseMode: 'query',
      redirectUri: `${process.env.VUE_APP_AUTH0_PACKAGEIDENTIFIER}` + '://home',
    });

    app.use(VueKeycloakJs, {
      init: {
        // Use 'login-required' to always require authentication
        // If using 'login-required', there is no need for the router guards in router.js
        onLoad: 'login-required', //'check-sso',
        checkLoginIframe: false,
        redirectUri:
          `${process.env.VUE_APP_AUTH0_PACKAGEIDENTIFIER}` +
          '://' +
          'capacitor/' +
          `${process.env.VUE_APP_PACKAGE_ID}`,
         silentCheckSsoRedirectUri:
          `${process.env.VUE_APP_AUTH0_PACKAGEIDENTIFIER}` +
          '://' +
          'capacitor/' +
          `${process.env.VUE_APP_PACKAGE_ID}` +
          '/silent-check-sso.html',
      },
      config: {
        url: `${process.env.VUE_APP_KEYCLOAK_URL}`,
        clientId: `${process.env.VUE_APP_KEYCLOAK_CLIENT_ID}`,
        realm: `${process.env.VUE_APP_KEYCLOAK_REALM}`,
      },
      onReady(keycloak: KeycloakInstance) {
        console.log('Keycloak ready mobile', keycloak);
      },
    });
  } else {
    keycloak.init({
      onLoad: 'login-required', //check-sso',
      silentCheckSsoFallback: false,
      /* checkLoginIframe: false,
      silentCheckSsoRedirectUri:
        window.location.origin + '/silent-check-sso.html',
    });*/
  /*  app.use(VueKeycloakJs, {
      init: {
        // Use 'login-required' to always require authentication
        // If using 'login-required', there is no need for the router guards in router.js
        onLoad: 'check-sso',
        //    checkLoginIframe: false,
        silentCheckSsoRedirectUri:
          window.location.origin + '/silent-check-sso.html',
      },
      config: {
        url: `${process.env.VUE_APP_KEYCLOAK_URL}`,
        clientId: `${process.env.VUE_APP_KEYCLOAK_CLIENT_ID}`,
        realm: `${process.env.VUE_APP_KEYCLOAK_REALM}`,
      },
      onReady(keycloak: KeycloakInstance) {
        console.log('Keycloak ready web', keycloak);
      },
    });
    */
  //app.config.globalProperties.$keycloak = keycloak;
});
