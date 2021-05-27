// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  origin: 'https://shelys.store/wordpress',
  wcEndpoint: 'wp-json/wc/v3',
  woocommerce: {
    consumer_key: 'ck_20b4aca3e4b9619ad55f836f65e63ebec9d1c850',
    consumer_secret: 'cs_96bd8d9f7a8ab8084aef227e03e77e0a1b290895'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

