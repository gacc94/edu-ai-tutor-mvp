import { User } from '../entities/user.entity';
import { CreditFactory } from './credit.factory';
import { UserPropsFromProviders } from '../interfaces/user.props';
import { IdVO, EmailVO, PhotoUrlVO, DisplayNameVO } from '../value-objects';

export class UserFactory {
    static createFromGoogle(props: UserPropsFromProviders): User {
        const { uid, email, displayName, photoURL, isEmailVerified, createdAt, updatedAt, lastLoginAt } = props;
        return new User({
            id: IdVO.create(uid),
            email: email ? EmailVO.create(email) : EmailVO.createEmpty(),
            displayName: displayName ? DisplayNameVO.create(displayName) : DisplayNameVO.createEmpty(),
            authProvider: 'google',
            credits: CreditFactory.createDefault(),
            createdAt: createdAt,
            updatedAt: updatedAt,
            isEmailVerified: isEmailVerified,
            photoURL: photoURL ? PhotoUrlVO.create(photoURL) : PhotoUrlVO.createEmpty(),
            lastLoginAt: lastLoginAt,
            isActive: true,
        });
    }
}
