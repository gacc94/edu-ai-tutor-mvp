import { Timestamp } from 'firebase/firestore';
import { UserProps } from '../interfaces/user.props';
import { IdVO, EmailVO, PhotoUrlVO, DisplayNameVO, TimestampVo, AuthProviderVO, PhoneNumberVO } from '../value-objects';
import { Credit } from './credit.entity';

export class User {
    private readonly _id: IdVO;
    private readonly _email: EmailVO;
    private readonly _photoURL: PhotoUrlVO | null;
    private readonly _displayName: DisplayNameVO;
    private readonly _authProvider: AuthProviderVO;
    private readonly _credits: Credit;
    private readonly _createdAt: TimestampVo;
    private readonly _updatedAt: TimestampVo;
    private readonly _emailVerified: boolean;
    private readonly _isActive: boolean;
    private readonly _lastLoginAt: TimestampVo;
    private readonly _phoneNumber: PhoneNumberVO | null;

    /**
     * @param props UserProps
     */
    constructor(props: UserProps) {
        this._id = new IdVO(props.id);
        this._email = new EmailVO(props.email);
        this._photoURL = props.photoURL ? new PhotoUrlVO(props.photoURL) : null;
        this._displayName = new DisplayNameVO(props.displayName);
        this._credits = new Credit(props.credits);
        this._createdAt = new TimestampVo(props.createdAt);
        this._updatedAt = new TimestampVo(props.updatedAt);
        this._lastLoginAt = new TimestampVo(props.lastLoginAt);
        this._authProvider = new AuthProviderVO(props.authProvider);
        this._phoneNumber = props.phoneNumber ? new PhoneNumberVO(props.phoneNumber) : null;
        this._emailVerified = props.emailVerified;
        this._isActive = props.isActive;
    }

    /*
     * ========================================================================================
     *                                      GETTERS
     * ========================================================================================
     */

    get id(): IdVO {
        return this._id;
    }

    get email(): EmailVO {
        return this._email;
    }

    get photoURL(): PhotoUrlVO | null {
        return this._photoURL;
    }

    get displayName(): DisplayNameVO {
        return this._displayName;
    }

    get authProvider(): AuthProviderVO {
        return this._authProvider;
    }

    get phoneNumber(): PhoneNumberVO | null {
        return this._phoneNumber;
    }

    get credits(): Credit {
        return this._credits;
    }

    get createdAt(): TimestampVo {
        return this._createdAt;
    }

    get updatedAt(): TimestampVo {
        return this._updatedAt;
    }

    get emailVerified(): boolean {
        return this._emailVerified;
    }

    get isActive(): boolean {
        return this._isActive;
    }

    get lastLoginAt(): TimestampVo {
        return this._lastLoginAt;
    }
}
