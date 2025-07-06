import { User } from '../entities/user.entity';
import { UserPropsFromProviders } from '../interfaces/user.props';
import { CreditFactory } from './credit.factory';

export class UserFactory {
    static createFromProvider(props: UserPropsFromProviders): User {
        return new User({
            id: props.id,
            email: props.email,
            displayName: props.displayName,
            authProvider: props.authProvider,
            credits: CreditFactory.create({
                current: props.credits.current,
                max: props.credits.max,
            }),
            createdAt: props.createdAt,
            updatedAt: props.updatedAt,
            emailVerified: props.emailVerified,
            photoURL: props.photoURL,
            phoneNumber: props.phoneNumber,
            lastLoginAt: props.lastLoginAt,
            isActive: props.isActive,
        });
    }
}
