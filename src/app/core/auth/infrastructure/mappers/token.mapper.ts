import { IdTokenResult } from 'firebase/auth';
import { ITokenState } from '../states/interfaces/token.state';
import { Token } from '@core/auth/domain/entities/token.entity';

export class TokenMapper {
    static toPersistence(domain: Token): ITokenState {
        return {
            token: domain.token,
            expirationTime: domain.expirationTime,
            issuedAtTime: domain.issuedAtTime,
            claims: domain.claims,
        };
    }

    static toDomain(tokenResult: IdTokenResult): Token {
        return new Token(
            tokenResult.token,
            new Date(tokenResult.expirationTime),
            new Date(tokenResult.issuedAtTime),
            tokenResult.signInProvider,
            tokenResult.claims
        );
    }
}
