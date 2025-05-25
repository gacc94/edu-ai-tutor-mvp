import { CUSTOM_ELEMENTS_SCHEMA, Component, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Photo } from '@capacitor/camera';
import { IonFooter, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { CameraService } from 'src/app/shared/services/camera.service';
import { ActionSheetController } from '@ionic/angular/standalone';
import { CameraSource } from '@capacitor/camera';

@Component({
    selector: 'app-footer',
    template: `
        <ion-footer class="footer">
            <!-- @if (imagesPreview().length > 0) {
            <div class="footer__preview">
                <ion-img [src]="imagesPreview()[0].webPath"></ion-img>
                <ion-button fill="clear" size="small" (click)="imagesPreview.set([])">
                    <ion-icon name="close-circle-outline"></ion-icon>
                </ion-button>
            </div>
            } -->
            <div class="footer__wrapper">
                <ion-button (click)="openImageOptions()">
                    <ion-icon slot="icon-only" name="attach-outline"></ion-icon>
                </ion-button>
                <ion-input
                    class="footer__input"
                    placeholder="Write To Send Message"
                    [formControl]="control"
                ></ion-input>
                <ion-button type="button" (click)="sendMessage()" [disabled]="control.invalid">
                    <ion-icon slot="icon-only" name="paper-plane-outline"></ion-icon>
                </ion-button>
            </div>
        </ion-footer>
    `,
    styleUrls: ['./footer.component.scss'],
    imports: [IonFooter, IonInput, IonButton, IonIcon, ReactiveFormsModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FooterComponent {
    control = this.formBuilder.control('', { nonNullable: true, validators: [Validators.required] });

    message = output<string>({
        alias: 'onSendMessage',
    });

    image = output<Photo>({
        alias: 'onSendImage',
    });

    imagesPreview = signal<Photo[]>([]);

    constructor(
        private formBuilder: FormBuilder,
        private cameraService: CameraService,
        private actionController: ActionSheetController
    ) {}

    sendMessage() {
        if (!this.control) return;
        const message = this.control.value.trim();
        this.message.emit(message);
        this.control.reset();
    }

    async openImageOptions() {
        const actionSheet = await this.actionController.create({
            id: 'action-sheet-picture',
            buttons: [
                {
                    text: 'Galeria',
                    icon: 'images-outline',
                    handler: () => this._takePicture(CameraSource.Photos),
                },
                {
                    text: 'Cámara',
                    icon: 'camera-outline',
                    handler: () => this._takePicture(CameraSource.Camera),
                },
                // {
                //     text: 'Cancelar',
                //     role: 'cancel',
                // },
            ],
        });
        await actionSheet.present();
    }

    private async _takePicture(source: CameraSource) {
        const picture = await this.cameraService.takePicture(source);
        console.log({ picture });
        this.imagesPreview.update((prev) => [...prev, picture]);
        // this.image.emit(picture);
    }
}
