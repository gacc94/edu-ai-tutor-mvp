import { CUSTOM_ELEMENTS_SCHEMA, Component, linkedSignal, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Photo } from '@capacitor/camera';
import { IonFooter, IonInput, IonButton, IonIcon, IonImg } from '@ionic/angular/standalone';
import { CameraService } from '@shared/services/camera.service';
import { CameraSource } from '@capacitor/camera';
import { IonicUtilsService } from '@shared/services/ionic-utils.service';
import { Message } from '@features/chat-math-solve/domain/entities/message.entity';
import { ChatMathStateService } from '@features/chat-math-solve/application/states/chat-math.state';
import { MessageFactory } from '@features/chat-math-solve/domain/factories/message.factory';
import { Image } from '@features/chat-math-solve/domain/entities/image.entity';

@Component({
    selector: 'app-footer',
    template: `
        <ion-footer class="footer">
            @if ($selectedImages().length > 0) {
            <div class="footer__preview">
                @for (image of $selectedImages(); track image.webPath; let i = $index) {
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
                <ion-input class="footer__input" placeholder="Escribe mensaje" [formControl]="control"></ion-input>
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

    $selectedImages = this._chatState.$selectedImages;
    $selectedImagesAsFiles = this._chatState.$selectedImagesAsFiles;

    onSendMessage = output<Message>();

    constructor(
        private _formBuilder: FormBuilder,
        private _cameraService: CameraService,
        private _ionicUtilsService: IonicUtilsService,
        private _chatState: ChatMathStateService
    ) {}

    get isDisabled(): boolean {
        return !this.control.valid || this.$selectedImages().length === 0;
    }

    async sendMessage() {
        const images = this.$selectedImages();
        const message = this.control.value.trim();

        const userMessage = MessageFactory.createUserMessage(message, images);
        this._chatState.message = userMessage;

        const files = await this._cameraService.imagesToFiles(images);
        this._chatState.selectedImageAsFile = files;

        this.onSendMessage.emit(userMessage);
        this._reset();
    }

    removeImage(index: number) {
        this.$selectedImages.update((prev) => prev.filter((_, i) => i !== index));
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
        this._chatState.selectedImage = await this._cameraService.takePicture(source);
    }

    private _reset() {
        this.control.reset();
        this.$selectedImages.set([]);
        this.$selectedImagesAsFiles.set([]);
    }
}
