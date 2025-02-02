import {AuthorizeToken} from "../entities.ts";

export function isAuthenticated(): boolean {
    const item = localStorage.getItem("token");
    if (item === null) return false;
    const token: AuthorizeToken = JSON.parse(item);
    return token.expire > new Date().getTime();
}

export function jwtToken(): string | null {
    const item = localStorage.getItem("token");
    if (item === null) return null;
    const token: AuthorizeToken = JSON.parse(item);
    return token.token;
}

export function updateToken(token: AuthorizeToken) {
    localStorage.setItem('token', JSON.stringify(token));
    window.location.href = '/';
}

export function logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
}