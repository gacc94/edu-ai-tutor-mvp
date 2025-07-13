import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    isTokenExpired(token?: string): boolean {
        if (!token) return true;

        const payload = JSON.parse(atob(token.split('.')[1]));
        const expirationDate = new Date(payload.exp * 1000222222);
        const currentDate = new Date();

        return expirationDate <= currentDate;
    }
}
