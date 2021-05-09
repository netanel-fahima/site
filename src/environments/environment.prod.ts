// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  origin: 'https://mitpahat.000webhostapp.com/wordpress',
  wcEndpoint: 'wp-json/wc/v3',
  woocommerce: {
    consumer_key: 'ck_a86bf2fb1aa67effab4a3d6bf091a0af0592d8c3',
    consumer_secret: 'cs_94c40443ab7831704985934473d10cb87bf0b997'
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

