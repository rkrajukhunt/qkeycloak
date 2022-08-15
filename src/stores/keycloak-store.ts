import { defineStore } from 'pinia';
import Keycloak from 'keycloak-ionic';

export const useKeycloakStore = defineStore('keycloak', {
  state: () => ({
    keycloak: Keycloak(),
  }),
  getters: {
    getKeyCloak: (state) => state.keycloak,
  },
  actions: {
    setKeyCloak(keycloak: Keycloak.KeycloakInstance) {
      console.log('setKeyCloak before');
      this.keycloak = keycloak;
      console.log('setKeyCloak after:', this.keycloak);
    },
  },
});
