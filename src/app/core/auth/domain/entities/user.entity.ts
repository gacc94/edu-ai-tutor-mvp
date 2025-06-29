import { UserProps } from '../interfaces/user.props';
import { IdVO, EmailVO, PhotoUrlVO, DisplayNameVO } from '../value-objects';
import { Credit } from './credit.entity';

export class User {
    constructor(private readonly props: UserProps) {}

    get id(): IdVO {
        return this.props.id;
    }

    get email(): EmailVO {
        return this.props.email;
    }

    get photoURL(): PhotoUrlVO {
        return this.props.photoURL;
    }

    get displayName(): DisplayNameVO {
        return this.props.displayName;
    }

    get authProvider(): string {
        return this.props.authProvider;
    }

    get credits(): Credit {
        return this.props.credits as Credit;
    }

    get createdAt(): string {
        return this.props.createdAt.toString();
    }

    get updatedAt(): string {
        return this.props.updatedAt.toString();
    }

    get isEmailVerified(): boolean {
        return this.props.isEmailVerified;
    }

    get isActive(): boolean {
        return this.props.isActive;
    }

    get lastLoginAt(): string | undefined {
        return this.props.lastLoginAt?.toString();
    }
}
