import { IBaseUseCase } from '@core/auth/application/interfaces/base-use-case';
import { User } from '@core/auth/domain/entities';
import { UserAuthResult } from '@core/auth/domain/interfaces/user-auth-result';

export interface IUserAuthUseCase extends IBaseUseCase<Promise<UserAuthResult<User>>> {}
