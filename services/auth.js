import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { GOOGLE_CLIENT_ID, SCOPES } from './auth-config';

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
    const [token, setToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: GOOGLE_CLIENT_ID,
        scopes: SCOPES,
        // For Expo Go, we often need to specify the redirect URI explicitly if auto-discovery fails,
        // but usually it works with the default proxy.
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            setToken(authentication.accessToken);
            fetchUserInfo(authentication.accessToken);
        }
    }, [response]);

    const fetchUserInfo = async (accessToken) => {
        try {
            const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            const user = await response.json();
            setUserInfo(user);
        } catch (error) {
            console.error('Error fetching user info', error);
        }
    };

    return {
        token,
        userInfo,
        request,
        promptAsync,
    };
};
