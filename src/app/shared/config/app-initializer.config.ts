import { EnvironmentProviders, provideAppInitializer } from '@angular/core';
import { addIcons } from 'ionicons';
import {
    logoIonic,
    home,
    flashOutline,
    searchOutline,
    bulbOutline,
    personOutline,
    helpCircleOutline,
    notificationsOutline,
    pulseOutline,
    desktopOutline,
    analyticsOutline,
    starOutline,
    warningOutline,
} from 'ionicons/icons';
import { register } from 'swiper/element/bundle';

/**
 * Initialize app initializers
 */
export const appInitializerProviders: EnvironmentProviders[] = [
    provideAppInitializer(() => {
        register();
        addIcons({
            logoIonic,
            home,
            flashOutline,
            searchOutline,
            bulbOutline,
            personOutline,
            helpCircleOutline,
            notificationsOutline,
            pulseOutline,
            desktopOutline,
            analyticsOutline,
            starOutline,
            warningOutline,
        });
    }),
];
