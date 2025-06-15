// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export interface IEnvironment {
    name: 'local' | 'production' | 'development';
    production: boolean;
    useEmulators: boolean;
    enableLogging: boolean;
    firebase: {
        projectId: string;
        appId: string;
        storageBucket: string;
        apiKey: string;
        authDomain: string;
        messagingSenderId: string;
    };
    emulators?: {
        auth: {
            host: 'localhost';
            port: 9099;
        };
        firestore: {
            host: 'localhost';
            port: 9097;
        };
        functions: {
            host: 'localhost';
            port: 9098;
        };
        storage: {
            host: 'localhost';
            port: 9096;
        };
        ui: {
            host: 'localhost';
            port: 9095;
        };
    };
    apis: {
        gemini: {
            baseUrl: string;
            mathSolve: string;
        };
    };
}
