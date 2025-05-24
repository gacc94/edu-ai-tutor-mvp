import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'io.ionic.starter',
    appName: 'eduAiTutor',
    webDir: 'www',
    plugins: {
        SafeArea: {
            enabled: true,
            customColorsForSystemBars: true,
            statusBarColor: '#ffffff',
            statusBarContent: 'light',
            navigationBarColor: '#ffffff',
            navigationBarContent: 'light',
            offset: 0,
        },
    },
};

export default config;
