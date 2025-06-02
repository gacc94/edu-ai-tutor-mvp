// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    name: 'local',
    production: false,
    useEmulators: true,
    enableLogging: true,
    firebase: {
        projectId: 'edu-ai-tutor',
        appId: '1:207854376775:web:908bbe0cce6e4a87ab1e62',
        storageBucket: 'edu-ai-tutor.firebasestorage.app',
        apiKey: 'AIzaSyBqJisg-oS2YiMm9MEFjHuZvmxe9k1Yo74',
        authDomain: 'edu-ai-tutor.firebaseapp.com',
        messagingSenderId: '207854376775',
    },
    emulators: {
        auth: {
            host: 'localhost',
            port: 9099,
        },
        firestore: {
            host: 'localhost',
            port: 9097,
        },
        functions: {
            host: 'localhost',
            port: 9098,
        },
        storage: {
            host: 'localhost',
            port: 9096,
        },
        ui: {
            host: 'localhost',
            port: 9095,
        },
    },
    apis: {
        openai: {
            baseUrl: 'https://api.openai.com/v1/chat/completions',
        },
        functions: {
            baseUrl: 'http://localhost:9098/edu-ai-tutor/us-central1/getPokemons',
        },
    },
    features: {
        enableAnalytics: false,
        enableCrashReporting: false,
        enablePerformanceMonitoring: false,
        enableDebugMode: true,
        enableMockData: true,
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
