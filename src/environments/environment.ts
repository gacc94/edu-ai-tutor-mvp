// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    name: 'local',
    production: false,
    firebase: {
        projectId: 'edu-ai-tutor',
        appId: '1:207854376775:web:908bbe0cce6e4a87ab1e62',
        storageBucket: 'edu-ai-tutor.firebasestorage.app',
        apiKey: 'AIzaSyBqJisg-oS2YiMm9MEFjHuZvmxe9k1Yo74',
        authDomain: 'edu-ai-tutor.firebaseapp.com',
        messagingSenderId: '207854376775',
    },
    apis: {
        openai: {
            baseUrl: 'https://api.openai.com/v1/chat/completions',
            apiKey: 'sk-proj-0100000000000000000000000000000000000000000000000000000000000000',
        },
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
