import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    isTokenExpired(token?: string): boolean {
        if (!token) return true;

        const payload = this.decodeToken(token);
        if (!payload) return true;

        const expirationDate = new Date(payload.exp * 1000);
        const currentDate = new Date();

        return expirationDate <= currentDate;
    }

    decodeToken(token?: string) {
        if (!token) return null;

        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload;
    }
}
