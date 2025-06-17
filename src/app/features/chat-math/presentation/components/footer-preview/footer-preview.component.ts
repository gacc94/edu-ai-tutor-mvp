import { Component, OnInit, input, output } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonButton, IonIcon, IonImg } from '@ionic/angular/standalone';
import { ImageState } from '@features/chat-math/application/states/interfaces/image.state';
import { IonicUtilsService } from '@shared/services/ionic-utils.service';
import { ModalImagePreviewComponent } from '../modal-image-preview/modal-image-preview.component';

@Component({
    selector: 'app-footer-preview',
    template: `
        <div class="footer__preview">
            @for (image of selectedImages(); track $index) {
            <div class="footer__preview-item">
                <ion-img [src]="image.webPath"></ion-img>
                <ion-button fill="clear" (click)="onRemoveImage($index)">
                    <ion-icon name="close-circle-outline"></ion-icon>
                </ion-button>
            </div>
            }
        </div>
    `,
    imports: [IonImg, IonButton, IonIcon],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    styleUrls: ['./footer-preview.component.scss'],
})
export class FooterPreviewComponent implements OnInit {
    selectedImages = input.required<Array<ImageState>>();
    removeImage = output<number>();

    constructor(private readonly _ionicUtilsService: IonicUtilsService) {}

    ngOnInit() {}

    onRemoveImage(index: number) {
        this.removeImage.emit(index);
    }

    async preview(index: number) {
        const modal = await this._ionicUtilsService.presentModal({
            component: ModalImagePreviewComponent,
            componentProps: {
                imageUrl: this.selectedImages()[index].webPath,
            },
            cssClass: 'custom-preview-modal',
        });
        await modal.present();
    }
}
