'use server';

import { cookies } from 'next/headers';

const isProduction = process.env.NODE_ENV === 'production';

export async function handleRefresh() {
    console.log('handleRefresh');

    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
        return null;
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/token/refresh/`, {
            method: 'POST',
            body: JSON.stringify({
                refresh: refreshToken
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();
        console.log('Response - Refresh:', json);

        if (json.access) {
            const c = await cookies();
            c.set('session_access_token', json.access, {
                httpOnly: true,
                secure: isProduction,
                sameSite: 'lax',
                maxAge: 60 * 60,
                path: '/'
            });

            return json.access;
        } else {
            return null;
        }
    } catch (error) {
        console.log('error', error);
        return null;
    }
}

export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
    const c = await cookies();

    c.set('session_userid', userId, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
    });

    c.set('session_access_token', accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        maxAge: 60 * 60,
        path: '/'
    });

    c.set('session_refresh_token', refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
    });
}

export async function resetAuthCookies() {
    const c = await cookies();
    c.set('session_userid', '');
    c.set('session_access_token', '');
    c.set('session_refresh_token', '');
}

export async function handleLogout() {
    const c = await cookies();
    const refreshToken = c.get('session_refresh_token')?.value;

    if (refreshToken) {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/logout/`, {
                method: 'POST',
                body: JSON.stringify({ refresh: refreshToken }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.log('Logout error:', error);
        }
    }

    resetAuthCookies();
}

export async function getUserId() {
    const c = await cookies();
    const userId = c.get('session_userid')?.value
    return userId ? userId : null
}

export async function getAccessToken() {
    const c = await cookies();
    let accessToken = c.get('session_access_token')?.value;

    if (!accessToken) {
        accessToken = await handleRefresh();
    }

    return accessToken || null;
}

export async function getRefreshToken() {
    const c = await cookies();
    let refreshToken = c.get('session_refresh_token')?.value;

    return refreshToken || null;
}
