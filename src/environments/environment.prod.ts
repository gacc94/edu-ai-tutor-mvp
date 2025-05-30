export const environment = {
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
        measurementId: 'G-XXXXXXXXXX', // Add your Google Analytics measurement ID
    },
    apis: {
        openai: {
            baseUrl: 'https://api.openai.com/v1/chat/completions',
            model: 'gpt-4-turbo-preview',
            maxTokens: 2000,
            temperature: 0.5,
        },
    },
    features: {
        enableAnalytics: true,
        enableCrashReporting: true,
        enablePerformanceMonitoring: true,
        enableDebugMode: false,
        enableMockData: false,
    },
    security: {
        enableCSP: true,
        enableCORS: true,
        maxRequestSize: 10485760, // 10MB
        rateLimiting: {
            windowMs: 900000, // 15 minutes
            maxRequests: 100,
        },
    },
    cache: {
        enableServiceWorker: true,
        cacheStrategy: 'cacheFirst',
        maxAge: 86400000, // 24 hours
    },
};
