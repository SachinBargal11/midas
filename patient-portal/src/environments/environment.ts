// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false, 
  // SERVICE_BASE_URL: 'http://patientapi.codearray.tk/midaspatientapi' 
  SERVICE_BASE_URL: 'http://patientdevapi.codearray.tk/midaspatientapi', 
  // SERVICE_BASE_URL: 'http://caserver:7010/midaspatientapi', 
  IDENTITY_SERVER_URL: 'https://identityserverdev.codearray.tk',
  NOTIFICATION_SERVER_URL: 'http://caserver:7011',
  HOME_URL: 'http://localhost:4200/home',
  APP_URL: 'http://localhost:4201'
};
