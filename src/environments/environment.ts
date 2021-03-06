// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://prod.mobo.com.br/api/v1',
  absoluteUrl: 'https://prod.mobo.com.br',
  awsBase: 'https://dev-dragon-dowing-images.s3-sa-east-1.amazonaws.com',
  awsBaseFiles: 'https://dev-dragon-dowing-images.s3-sa-east-1.amazonaws.com/files',
  firebase:{
    apiKey: "AIzaSyCKNFgPaId7RyUxPZAfOsJwAfq11RUAAUs",
    authDomain: "mobo-dev.firebaseapp.com",
    projectId: "mobo-dev",
    storageBucket: "mobo-dev.appspot.com",
    messagingSenderId: "847390921940",
    appId: "1:847390921940:web:85d469e0725800f2e79741",
    measurementId: "G-99X8T051PQ"
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
