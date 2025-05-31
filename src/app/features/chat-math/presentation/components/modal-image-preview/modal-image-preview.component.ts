import { Component, OnInit } from '@angular/core';
import { input } from '@angular/core';
import { ImageCropperComponent } from 'ngx-image-cropper';

@Component({
    selector: 'app-modal-image-preview',
    template: `
        <input type="file" (change)="onFileChange($event)" />
        <!-- <image-cropper
            *ngIf="showCropper && imageEvent"
            [imageChangedEvent]="imageEvent"
            [maintainAspectRatio]="maintainAspectRatio"
            [transform]="transform"
            [resizeToWidth]="1024"
            format="png"
            class="modal-image-preview__cropper"
        ></image-cropper> -->
        <image-cropper
            [imageChangedEvent]="imageEvent"
            [maintainAspectRatio]="true"
            [aspectRatio]="4 / 3"
            format="png"
            (imageCropped)="imageCropped($event)"
            (imageLoaded)="imageLoaded()"
            (cropperReady)="cropperReady()"
            (loadImageFailed)="loadImageFailed()"
        ></image-cropper>
    `,
    styleUrls: ['./modal-image-preview.component.scss'],
    imports: [ImageCropperComponent],
})
export class ModalImagePreviewComponent implements OnInit {
    imageUrl = input.required<string>();
    imageEvent: any;
    showCropper = false;
    imageLoadedFlag = false;
    maintainAspectRatio = true;
    transform = {
        rotate: 0,
        scale: 1,
        translateX: 0,
        translateY: 0,
    };
    croppedImage: any;
    constructor() {}

    ngOnInit() {}

    onFileChange(event: any) {
        this.imageEvent = event;
    }

    imageCropped(event: any) {
        this.croppedImage = event;
    }

    imageLoaded() {
        this.imageLoadedFlag = true;
    }

    cropperReady() {
        this.showCropper = true;
    }

    loadImageFailed() {
        console.log('Load image failed');
    }
}
