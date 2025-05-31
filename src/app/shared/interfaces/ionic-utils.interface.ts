import { ActionSheetButton } from '@ionic/angular/standalone';

export interface PresentActionSheetParams {
    buttons: ActionSheetButton[];
    header?: string;
    id?: string;
}

export interface PresentToastParams {
    message: string;
    duration: number;
    color?: 'dark' | 'light' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'medium';
    position?: 'bottom' | 'top' | 'middle';
    animated?: boolean;
}
