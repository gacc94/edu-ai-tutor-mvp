import { IdTokenResult } from 'firebase/auth';
import { ITokenState } from '../../application/states/interfaces/token.state';

export class TokenMapper {
    static toState(firebaseTokenResult: IdTokenResult): ITokenState {
        return {
            token: firebaseTokenResult.token,
            expirationTime: new Date(firebaseTokenResult.expirationTime),
            issuedAtTime: new Date(firebaseTokenResult.issuedAtTime),
            claims: firebaseTokenResult.claims,
        };
    }
}
