export const environment = {
  production: true,
  IDENTITY_SCOPE: "openid profile email roles MidasMedicalProviderAPI NotificationService MessagingServiceAPI",
  AUTHORIZATION_SERVER_URL: "https://dev-gb-identityserver.qwinix.io/core",
  CLIENT_ID: 'MidasPortal',                  //staging production
  //CLIENT_ID: 'MidasPortalLocal',          //local
  //CLIENT_ID: 'MidasPortalDev',            //staging dev
  // MEDICAL_PROVIDER_URI: 'http://localhost:4201/',
  // PATIENT_PORTAL_URI: 'http://localhost:4201/',
  // ATTORNEY_PORTAL_URI: 'http://localhost:4201/',
  // ANCILLARY_PORTAL_URI: 'http://localhost:4201/',
  MEDICAL_PROVIDER_URI: 'http://dev-gb-medicalprovider.qwinix.io/',
  PATIENT_PORTAL_URI: 'http://dev-gb-patient.qwinix.io/',
  ATTORNEY_PORTAL_URI: 'http://dev-gb-attorney.qwinix.io/',
  ANCILLARY_PORTAL_URI: 'http://gb-ancillary.qwinix.io/'
};
