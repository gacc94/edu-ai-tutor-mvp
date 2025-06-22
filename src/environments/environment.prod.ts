import { IEnvironment } from './ienvironment';

const GEMINI_BASE_URL = 'https://edu-ai-tutor-644032611464.us-central1.run.app';
const GEMINI_API_URL = `${GEMINI_BASE_URL}/api/v1`;

export const environment: IEnvironment = {
    name: 'production',
    production: true,
    useEmulators: false,
    enableLogging: false,
    firebase: {
        projectId: 'edu-ai-tutor',
        appId: '1:207854376775:web:908bbe0cce6e4a87ab1e62',
        storageBucket: 'edu-ai-tutor.firebasestorage.app',
        apiKey: 'AIzaSyBqJisg-oS2YiMm9MEFjHuZvmxe9k1Yo74',
        authDomain: 'edu-ai-tutor.firebaseapp.com',
        messagingSenderId: '207854376775',
    },
    apis: {
        gemini: {
            baseUrl: GEMINI_BASE_URL,
            mathSolve: `${GEMINI_API_URL}/math-solve/chat`,
        },
    },
};
