import { EnvironmentProviders, provideAppInitializer } from '@angular/core';
import { ICON_LIST } from '@shared/utils/constants/icons-list.constant';
import { addIcons } from 'ionicons';
import * as icons from 'ionicons/icons';
import { register } from 'swiper/element/bundle';

function getSelectedIcons(iconNames: Array<keyof typeof icons>): Record<string, string> {
    const selectedIcons: Record<string, string> = {};
    for (const iconName of iconNames) {
        selectedIcons[iconName] = icons[iconName];
    }
    return selectedIcons;
}

export const appInitializerProviders: EnvironmentProviders[] = [
    provideAppInitializer(() => {
        register();
        addIcons(getSelectedIcons(ICON_LIST));
    }),
];
