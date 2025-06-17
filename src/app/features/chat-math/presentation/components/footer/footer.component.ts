import { CUSTOM_ELEMENTS_SCHEMA, Component, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonFooter, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { CameraSource } from '@capacitor/camera';
import { IonicUtilsService } from '@shared/services/ionic-utils.service';
import { Message } from '@features/chat-math/domain/entities/message.entity';
import { IMAGES_SELECTED_STATE } from '@features/chat-math/application/states/states';
import { Inject } from '@angular/core';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { FooterPreviewComponent } from '../footer-preview/footer-preview.component';
import { ChatService } from '@features/chat-math/application/services/chat.service';
import { ImageState } from '@features/chat-math/application/states/interfaces';

@Component({
    selector: 'app-footer',
    template: `
        <ion-footer class="footer">
            @let selectedImages = $selectedImages() ?? [];
            <!--  -->
            @if (selectedImages.length > 0) {
            <app-footer-preview
                [selectedImages]="selectedImages"
                (removeImage)="removeImage($event)"
            ></app-footer-preview>
            }
            <div class="footer__wrapper">
                <ion-button (click)="openImageOptions()">
                    <ion-icon slot="icon-only" name="attach-outline"></ion-icon>
                </ion-button>
                <ion-input
                    class="footer__input"
                    placeholder="Escribe tu problema o adjunta imágenes"
                    [formControl]="control"
                ></ion-input>
                <ion-button type="button" (click)="sendMessage()" [disabled]="isDisabled">
                    <ion-icon slot="icon-only" name="paper-plane-outline"></ion-icon>
                </ion-button>
            </div>
        </ion-footer>
    `,
    styleUrls: ['./footer.component.scss'],
    imports: [IonFooter, IonInput, IonButton, IonIcon, ReactiveFormsModule, FooterPreviewComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FooterComponent {
    control = this._formBuilder.control('', { nonNullable: true, validators: [Validators.required] });

    $selectedImages = this._imagesSelectedState.$state;

    onSendMessage = output<Message>();

    constructor(
        private _formBuilder: FormBuilder,
        private _ionicUtilsService: IonicUtilsService,
        private _chatService: ChatService,
        @Inject(IMAGES_SELECTED_STATE) private _imagesSelectedState: IStateStorage<ImageState[]>
    ) {}

    get isDisabled(): boolean {
        return !this.control?.valid || this.$selectedImages()?.length === 0;
    }

    async sendMessage() {
        const message = this.control.value.trim();

        const userMessage = await this._chatService.prepareSendingMessage(message);

        this.onSendMessage.emit(userMessage);
        this._reset();
    }

    removeImage(index: number) {
        const newImages = this.$selectedImages()?.filter((_, i) => i !== index);
        this._imagesSelectedState.save(newImages ?? []);
    }

    async openImageOptions(): Promise<void> {
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

    private async _takePicture(source: CameraSource): Promise<void> {
        await this._chatService.takePicture(source);
    }

    private _reset() {
        this._imagesSelectedState.clear();
        this.control.reset();
    }
}
