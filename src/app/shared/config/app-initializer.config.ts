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
    chatbubbleEllipses,
    gridOutline,
    createOutline,
    chatboxEllipsesOutline,
    timeOutline,
    chatbubbleOutline,
    imageOutline,
    chatbubblesOutline,
    chatboxEllipses,
    grid,
    time,
    person,
    closeOutline,
    arrowBackOutline,
    cameraOutline,
    paperPlaneOutline,
    cogOutline,
    happyOutline,
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
            chatbubbleEllipses,
            gridOutline,
            createOutline,
            chatboxEllipsesOutline,
            timeOutline,
            chatbubbleOutline,
            imageOutline,
            chatbubblesOutline,
            chatboxEllipses,
            grid,
            time,
            person,
            closeOutline,
            arrowBackOutline,
            cameraOutline,
            paperPlaneOutline,
            cogOutline,
            happyOutline,
        });
    }),
];
