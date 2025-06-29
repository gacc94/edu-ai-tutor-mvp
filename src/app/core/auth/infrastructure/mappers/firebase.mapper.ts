import { IdTokenResult, UserCredential } from '@angular/fire/auth';

export interface UserResponseDto {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    providerId: string;
    isEmailVerified: boolean;
    credits: number;
}

export class FirebaseMapper {
    static toResponseDto(tokenResult: IdTokenResult, userCredential: UserCredential) {
        return {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            displayName: userCredential.user.displayName,
            photoURL: userCredential.user.photoURL,
            providerId: userCredential.user.providerId,
            isEmailVerified: userCredential.user.emailVerified,
            credits: tokenResult.claims['credits'],
        };
    }
}
