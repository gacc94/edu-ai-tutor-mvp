import { CUSTOM_ELEMENTS_SCHEMA, Component, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonFooter, IonInput, IonButton, IonIcon, IonImg } from '@ionic/angular/standalone';
import { CameraService } from '@shared/services/camera.service';
import { CameraSource } from '@capacitor/camera';
import { IonicUtilsService } from '@shared/services/ionic-utils.service';
import { Message } from '@features/chat-math-solve/domain/entities/message.entity';
import {
    MESSAGES_STATE,
    IMAGES_SELECTED_STATE,
    IMAGES_SELECTED_AS_FILES_STATE,
} from '@features/chat-math-solve/application/states/chat-math.state';
import { MessageFactory } from '@features/chat-math-solve/domain/factories/message.factory';
import { Inject } from '@angular/core';
import { Image } from '@features/chat-math-solve/domain/entities/image.entity';
import { MessageState } from '@features/chat-math-solve/application/states/interfaces/chat-math.state.interface';
import { StateStorage } from '@shared/storage/interfaces/state-storage.interface';

@Component({
    selector: 'app-footer',
    template: `
        <ion-footer class="footer">
            @if (selectedImages.length > 0) {
            <div class="footer__preview">
                @for (image of selectedImages; track $index) {
                <div class="footer__preview-item">
                    <ion-img [src]="image.webPath"></ion-img>
                    <ion-button fill="clear" (click)="removeImage($index)">
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

    $selectedImages = this._imagesSelectedState.$state;
    $selectedImagesAsFiles = this._imagesSelectedAsFilesState.$state;

    onSendMessage = output<Message>();

    constructor(
        private _formBuilder: FormBuilder,
        private _cameraService: CameraService,
        private _ionicUtilsService: IonicUtilsService,
        @Inject(MESSAGES_STATE) private _messagesState: StateStorage<Array<MessageState>>,
        @Inject(IMAGES_SELECTED_STATE) private _imagesSelectedState: StateStorage<Array<Image>>,
        @Inject(IMAGES_SELECTED_AS_FILES_STATE) private _imagesSelectedAsFilesState: StateStorage<Array<File>>
    ) {}

    get isDisabled(): boolean {
        return !this.control?.valid || this.selectedImages.length === 0;
    }

    get selectedImages(): Array<Image> {
        return this.$selectedImages() ?? [];
    }

    async sendMessage() {
        const images = this.selectedImages;
        const message = this.control.value.trim();

        const userMessage = MessageFactory.createUserMessage(message, images);
        const messages = this._messagesState.$state() ?? [];
        this._messagesState.save([...messages, userMessage]);

        const files = await this._cameraService.imagesToFiles(images);
        this._imagesSelectedAsFilesState.save(files);

        this.onSendMessage.emit(userMessage);
        this._reset();
    }

    removeImage(index: number) {
        const newImages = this.selectedImages.filter((_, i) => i !== index);
        this._imagesSelectedState.save(newImages);
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
        const image = await this._cameraService.takePicture(source);
        const images = [...this.selectedImages, image];
        this._imagesSelectedState.save(images);
    }

    private _reset() {
        this._imagesSelectedState.clear();
        this.control.reset();
    }
}
