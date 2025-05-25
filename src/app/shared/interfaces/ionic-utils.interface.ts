import { ActionSheetButton } from '@ionic/angular/standalone';

export interface PresentActionSheetParams {
    buttons: ActionSheetButton[];
    header?: string;
    id?: string;
}
