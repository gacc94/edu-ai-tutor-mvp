export interface ITokenState {
    token: string;
    expirationTime: Date;
    issuedAtTime: Date;
    claims?: Record<string, unknown>;
}
