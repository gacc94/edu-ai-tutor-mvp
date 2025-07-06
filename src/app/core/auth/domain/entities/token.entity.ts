export class Token {
    private _token: string;
    private _expirationTime: Date;
    private _issuedAtTime: Date;
    private _signInProvider: string | null;
    private _claims: Record<string, any>;

    constructor(token: string, expirationTime: Date, issuedAtTime: Date, signInProvider: string | null, claims: Record<string, any>) {
        this._token = token;
        this._expirationTime = expirationTime;
        this._issuedAtTime = issuedAtTime;
        this._signInProvider = signInProvider;
        this._claims = claims;
    }

    get token(): string {
        return this._token;
    }

    get expirationTime(): Date {
        return this._expirationTime;
    }

    get issuedAtTime(): Date {
        return this._issuedAtTime;
    }

    get signInProvider(): string | null {
        return this._signInProvider;
    }

    get claims(): Record<string, any> {
        return this._claims;
    }
}
