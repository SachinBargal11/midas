// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  IDENTITY_SCOPE: "openid profile email roles MidasMedicalProviderAPI NotificationService MessagingServiceAPI",
  AUTHORIZATION_SERVER_URL: "https://qa-gb-identityserver.qwinix.io/core",
  // CLIENT_ID: 'MidasPortal',                  //staging production
  CLIENT_ID: 'MidasPortalLocal',          //local
  // CLIENT_ID: 'MidasPortalDev',            //staging dev
   MEDICAL_PROVIDER_URI: 'http://localhost:4201/',
   PATIENT_PORTAL_URI: 'http://localhost:4202/',
   ATTORNEY_PORTAL_URI: 'http://localhost:4203/',
   ANCILLARY_PORTAL_URI: 'http://localhost:4204/',
  // MEDICAL_PROVIDER_URI: 'http://medicalproviderdev.codearray.tk/',
  // PATIENT_PORTAL_URI: 'http://patientdev.codearray.tk/',
  // ATTORNEY_PORTAL_URI: 'http://attorneydev.codearray.tk/',
  // ANCILLARY_PORTAL_URI: 'http://ancillarydev.codearray.tk/',
 // MEDICAL_PROVIDER_URI: 'http://gb-medicalprovider.qwinix.io/',
  //PATIENT_PORTAL_URI: 'http://gb-patient.qwinix.io/',
  //ATTORNEY_PORTAL_URI: 'http://gb-attorney.qwinix.io/',
  //ANCILLARY_PORTAL_URI: 'http://gb-ancillary.qwinix.io/'
};