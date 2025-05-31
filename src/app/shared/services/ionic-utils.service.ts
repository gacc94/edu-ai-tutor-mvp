import { ActionSheetButton, ActionSheetController, ToastController } from '@ionic/angular/standalone';
import { Injectable } from '@angular/core';
import { PresentActionSheetParams, PresentToastParams } from '../interfaces/ionic-utils.interface';

@Injectable({
    providedIn: 'root',
})
export class IonicUtilsService {
    constructor(private _actionSheetController: ActionSheetController, private _toastController: ToastController) {}

    async presentActionSheet({ buttons, header, id }: PresentActionSheetParams) {
        const actionSheet = await this._actionSheetController.create({
            id,
            header,
            buttons,
            animated: true,
            backdropDismiss: true,
        });
        await actionSheet.present();
        return actionSheet;
    }

    async presentToast({ message, duration, color, position, animated }: PresentToastParams) {
        const toast = await this._toastController.create({
            message,
            duration,
            position: position ?? 'bottom',
            color: color ?? 'dark',
            animated: animated ?? true,
        });
        await toast.present();
    }
}
