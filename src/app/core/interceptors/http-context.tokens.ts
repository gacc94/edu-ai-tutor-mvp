import { HttpContextToken } from '@angular/common/http';

// Un token para controlar si el interceptor debe añadir el token de Auth.
// Por defecto, se asume que sí (`true`).
export const WITH_AUTH_TOKEN = new HttpContextToken<boolean>(() => true);
