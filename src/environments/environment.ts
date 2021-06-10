// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  origin: 'http://localhost/wordpress',
  wcEndpoint: 'wp-json/wc/v3',
  woocommerce: {
    consumer_key: 'ck_a5c84fc1c4b899eb8627b2d17e0644e421bcd710',
    consumer_secret: 'cs_ad6eaf501f652ab1f786bd32da7ba3286b7e2233'
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

