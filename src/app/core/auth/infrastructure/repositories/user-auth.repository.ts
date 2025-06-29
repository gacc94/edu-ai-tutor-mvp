import { environment } from '@envs/environment';
import { AppResponseDto } from '@shared/infrastructure/dtos/app-response.dto';
import { UserResponseDto } from '../mappers/firebase.mapper';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { IUserAuthRepository } from '@core/auth/domain/repositories/user-auth.repository';
import { HttpContext } from '@angular/common/http';
import { WITH_AUTH_TOKEN } from '@core/interceptors/http-context.tokens';

export class UserAuthRepository implements IUserAuthRepository {
    private readonly _baseUrl = environment.apis.user.auth;

    constructor(private readonly _http: HttpClient) {}

    async signIn(): Promise<AppResponseDto<UserResponseDto>> {
        const response = this._http.post<AppResponseDto<UserResponseDto>>(`${this._baseUrl}`, null, {
            context: new HttpContext().set(WITH_AUTH_TOKEN, true),
        });

        return firstValueFrom(response);
    }

    // const response = await fetch(`${this._baseUrl}/signIn`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${token}`,
    //     },
    // });
    // const data = (await response.json()) as AppResponseDto<UserResponseDto>;
    // return data;
}
