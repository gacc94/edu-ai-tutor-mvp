import { ActionSheetController, ToastController, ModalController } from '@ionic/angular/standalone';
import { Injectable } from '@angular/core';
import { PresentActionSheetParams, PresentModalParams, PresentToastParams } from '../interfaces/ionic-utils.interface';

@Injectable({
    providedIn: 'root',
})
export class IonicUtilsService {
    constructor(
        private _actionSheetController: ActionSheetController,
        private _toastController: ToastController,
        private _modalController: ModalController
    ) {}

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

    async presentModal({ component, componentProps }: PresentModalParams) {
        const modal = await this._modalController.create({
            component,
            componentProps,
            cssClass: 'custom-preview-modal',
        });

        await modal.present();
        return modal;
    }
}
