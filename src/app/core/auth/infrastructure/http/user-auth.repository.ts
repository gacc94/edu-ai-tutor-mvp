import { environment } from '@envs/environment';
import { HttpClient } from '@angular/common/http';
import { HttpContext } from '@angular/common/http';
import { WITH_AUTH_TOKEN } from '@core/interceptors/http-context.tokens';
import { firstValueFrom, map } from 'rxjs';
import { IUserAuthPort } from '@core/auth/domain/ports/user-auth.port';
import { User } from '@core/auth/domain/entities';
import { UserHttpResponseDto } from '../schemas/user.schema';
import { UserAuthResult } from '@core/auth/domain/interfaces/user-auth-result';
import { UserAuthMapper } from '../mappers/user-auth.mapper';
import { inject } from '@angular/core';

export class UserAuthRepository implements IUserAuthPort {
    private readonly _http: HttpClient = inject(HttpClient);

    private readonly _baseUrl = environment.apis.user.auth;

    signIn(): Promise<UserAuthResult<User>> {
        const observable$ = this._http
            .post<UserHttpResponseDto>(`${this._baseUrl}`, null, {
                context: new HttpContext().set(WITH_AUTH_TOKEN, true),
            })
            .pipe(map(({ data }) => UserAuthMapper.toDomain(data)));

        return firstValueFrom(observable$);
    }
}
