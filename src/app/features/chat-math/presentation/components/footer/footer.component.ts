import { CUSTOM_ELEMENTS_SCHEMA, Component, output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonFooter, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { CameraSource } from '@capacitor/camera';
import { IonicUtilsService } from '@shared/services/ionic-utils.service';
import { Message } from '@features/chat-math/domain/entities/message.entity';
import { FooterPreviewComponent } from '../footer-preview/footer-preview.component';
import { ChatFacade } from '../../facades/chat.facade';
import { IMAGES_SELECTED_STATE } from '@features/chat-math/infrastructure/providers/provider';
import { USER_STATE } from '@core/auth/infrastructure/providers/providers';

@Component({
    selector: 'app-footer',
    template: `
        <ion-footer class="footer">
            @let selectedImages = $selectedImages() ?? [];
            <!-- Show preview if there are images -->
            @if (selectedImages.length > 0) {
            <app-footer-preview [selectedImages]="selectedImages" (removeImage)="removeImage($event)"></app-footer-preview>
            }
            <div class="footer__wrapper">
                <ion-button (click)="openImageOptions()">
                    <ion-icon slot="icon-only" name="camera-outline"></ion-icon>
                </ion-button>
                <ion-input class="footer__input" placeholder="Escribe tu problema o adjunta imágenes" [formControl]="control"></ion-input>
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
    private readonly _formBuilder = inject(FormBuilder);
    private readonly _imagesSelectedState = inject(IMAGES_SELECTED_STATE);
    private readonly _ionicUtilsService = inject(IonicUtilsService);
    private readonly _facade = inject(ChatFacade);
    private readonly _userState = inject(USER_STATE);

    control = this._formBuilder.control('', { nonNullable: true, validators: [Validators.required] });

    $selectedImages = this._imagesSelectedState.$state;

    onSendMessage = output<Message>();

    get isDisabled(): boolean {
        const currentCredits = this._userState.$state()?.credits.current ?? 0;
        return !this.control?.valid || this.$selectedImages()?.length === 0 || currentCredits <= 0;
    }

    async sendMessage() {
        const message = this.control.value.trim();

        const userMessage = await this._facade.preparingSendingMessage(message);

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
        await this._facade.takePicture(source);
    }

    private _reset() {
        this._imagesSelectedState.clear();
        this.control.reset();
    }
}
