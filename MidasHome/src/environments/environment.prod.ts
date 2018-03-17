export const environment = {
  production: true,
  IDENTITY_SCOPE: "openid profile email roles MidasMedicalProviderAPI NotificationService MessagingServiceAPI",
  AUTHORIZATION_SERVER_URL: "https://qa-gb-identityserver.qwinix.io/core",
  CLIENT_ID: 'MidasPortal',                  //staging production
  //CLIENT_ID: 'MidasPortalLocal',          //local
  //CLIENT_ID: 'MidasPortalDev',            //staging dev
  // MEDICAL_PROVIDER_URI: 'http://localhost:4201/',
  // PATIENT_PORTAL_URI: 'http://localhost:4201/',
  // ATTORNEY_PORTAL_URI: 'http://localhost:4201/',
  // ANCILLARY_PORTAL_URI: 'http://localhost:4201/',
  MEDICAL_PROVIDER_URI: 'http://qa-gb-medicalprovider.qwinix.io/',
  PATIENT_PORTAL_URI: 'http://gb-patient.qwinix.io/',
  ATTORNEY_PORTAL_URI: 'http://gb-attorney.qwinix.io/',
  ANCILLARY_PORTAL_URI: 'http://gb-ancillary.qwinix.io/'
};