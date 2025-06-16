import { IEnvironment } from './ienvironment';

const GEMINI_BASE_URL = 'http://localhost:3500';
const GEMINI_API_URL = `${GEMINI_BASE_URL}/api/v1`;

export const environment: IEnvironment = {
    name: 'development',
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
        gemini: {
            baseUrl: GEMINI_BASE_URL,
            mathSolve: `${GEMINI_API_URL}/math-solve/chat`,
        },
    },
};
