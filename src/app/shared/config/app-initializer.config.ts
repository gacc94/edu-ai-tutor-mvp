import { ChatPort } from '@features/chat-math/domain/ports/chat.repository';
import { EnvironmentProviders, inject, provideAppInitializer } from '@angular/core';
import { TOKEN_STATE } from '@core/auth/infrastructure/providers/providers';
import { LIST_ICONS } from '@shared/utils/constants/list-icons.constants';
import { addIcons } from 'ionicons';
import * as Ionicons from 'ionicons/icons';
import { register } from 'swiper/element/bundle';

export const getSelectedIcons = (iconNames: Array<keyof typeof Ionicons>): Record<string, string> => {
    const selectedIcons: Record<string, string> = {};
    for (const iconName of iconNames) {
        selectedIcons[iconName] = Ionicons[iconName];
    }
    return selectedIcons;
};

/**
 * Inicializa los providers de la app
 */
export const appInitializerProviders: EnvironmentProviders[] = [
    provideAppInitializer(() => {
        register();
        addIcons(getSelectedIcons(LIST_ICONS));
    }),
];
