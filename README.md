# Quasar App (qkeycloak)

A quasar keycloak implementation. Login in Web and IOS and Android devices

Based on the Quasar CLI starting project (https://quasar.dev/start/quasar-cli)

- the Ionic Keycloak library (https://github.com/JohannesBauer97/keycloak-ionic) for the Capacitor interface
- The VueJS KeyCloak library for the reactivity (https://github.com/dsb-norge/vue-keycloak-js) slightly modified to make things working

It is just an experimental project. Further work might be needed for production quality. It might nevertheless help some people.

one can connect to a local instance of keycloak or a hosted one. Preference for the second for simplicity of connection on ios,android devices. Export of the realm included (realm-export.json)

A Quasar Project

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
