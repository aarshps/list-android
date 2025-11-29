export const GOOGLE_CLIENT_ID = '1054367921966-nv7huajmbgfp89i17mbva54ulk4ut1pu.apps.googleusercontent.com';
// Note: Client Secret is generally not needed for implicit flow or PKCE on client side, 
// but if we need it for some specific flow we can add it. 
// For Expo Auth Session with Google, we usually just need the Client ID.
// However, if we are doing a code exchange on the client (less secure but possible for personal apps), we might need it.
// For now, let's store it but be aware of security implications if this were a public app.
export const GOOGLE_CLIENT_SECRET = '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'; 

export const SCOPES = [
  'https://www.googleapis.com/auth/drive.file', // View and manage Google Drive files and folders that you have opened or created with this app
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
];
