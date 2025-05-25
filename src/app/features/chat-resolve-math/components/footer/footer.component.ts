import { CUSTOM_ELEMENTS_SCHEMA, Component, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Photo } from '@capacitor/camera';
import { IonFooter, IonInput, IonButton, IonIcon, IonImg } from '@ionic/angular/standalone';
import { CameraService } from 'src/app/shared/services/camera.service';
import { ActionSheetController } from '@ionic/angular/standalone';
import { CameraSource } from '@capacitor/camera';
import { IonicUtilsService } from 'src/app/shared/services/ionic-utils.service';

@Component({
    selector: 'app-footer',
    template: `
        <ion-footer class="footer">
            @if (imagesPreview().length > 0) {
            <div class="footer__preview">
                @for (image of imagesPreview(); track image.webPath; let i = $index) {
                <div class="footer__preview-item">
                    <ion-img [src]="image.webPath"></ion-img>
                    <ion-button fill="clear" (click)="removeImage(i)">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </ion-button>
                </div>
                }
            </div>
            }
            <div class="footer__wrapper">
                <ion-button (click)="openImageOptions()">
                    <ion-icon slot="icon-only" name="attach-outline"></ion-icon>
                </ion-button>
                <ion-input
                    class="footer__input"
                    placeholder="Write To Send Message"
                    [formControl]="control"
                ></ion-input>
                <ion-button type="button" (click)="sendMessage()" [disabled]="isDisabled">
                    <ion-icon slot="icon-only" name="paper-plane-outline"></ion-icon>
                </ion-button>
            </div>
        </ion-footer>
    `,
    styleUrls: ['./footer.component.scss'],
    imports: [IonFooter, IonInput, IonButton, IonIcon, ReactiveFormsModule, IonImg],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FooterComponent {
    control = this._formBuilder.control('', { nonNullable: true, validators: [Validators.required] });

    onSendMessage = output<{ message: string; images: Array<Photo> }>();

    imagesPreview = signal<Array<Photo>>([
        {
            webPath:
                'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            format: 'jpeg',
            saved: true,
        },
    ]);

    constructor(
        private _formBuilder: FormBuilder,
        private _cameraService: CameraService,
        private _ionicUtilsService: IonicUtilsService
    ) {}

    get isDisabled(): boolean {
        return !this.control.valid || this.imagesPreview().length === 0;
    }

    sendMessage() {
        if (!this.control) return;

        const images = this.imagesPreview();
        if (images.length === 0) return;

        const message = this.control.value.trim();
        this.onSendMessage.emit({ message, images });
        this.imagesPreview.set([]);
        this.control.reset();
    }

    removeImage(index: number) {
        this.imagesPreview.update((prev) => prev.filter((_, i) => i !== index));
    }

    async openImageOptions() {
        await this._ionicUtilsService.presentActionSheet({
            id: 'action-sheet-picture',
            buttons: [
                {
                    text: 'Galeria',
                    icon: 'images-outline',
                    data: { source: CameraSource.Photos },
                    role: 'selected',
                    handler: () => this._takePicture(CameraSource.Photos),
                },
                {
                    text: 'Cámara',
                    icon: 'camera-outline',
                    data: { source: CameraSource.Camera },
                    role: 'selected',
                    handler: () => this._takePicture(CameraSource.Camera),
                },
                {
                    text: 'Cancelar',
                    role: 'cancel',
                },
            ],
        });
    }

    private async _takePicture(source: CameraSource) {
        const picture = await this._cameraService.takePicture(source);
        this.imagesPreview.update((prev) => [...prev, picture]);
    }
}
