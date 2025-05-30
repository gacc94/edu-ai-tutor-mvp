import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.eduaitutor.app',
    appName: 'EduAI Tutor',
    webDir: 'www',
    plugins: {
        SafeArea: {
            enabled: true,
            customColorsForSystemBars: true,
            statusBarColor: '#000000',
            statusBarContent: 'light',
            navigationBarColor: '#000000',
            navigationBarContent: 'light',
            offset: 0,
        },
        StatusBar: {
            style: 'dark',
            backgroundColor: '#000000',
        },
    },
};

export default config;
