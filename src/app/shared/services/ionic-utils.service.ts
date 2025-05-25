import { ActionSheetButton, ActionSheetController } from '@ionic/angular/standalone';
import { Injectable } from '@angular/core';
import { PresentActionSheetParams } from '../interfaces/ionic-utils.interface';

@Injectable({
    providedIn: 'root',
})
export class IonicUtilsService {
    constructor(private _actionSheetController: ActionSheetController) {}

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
}
