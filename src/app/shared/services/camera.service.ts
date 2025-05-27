import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Image } from '@features/chat-math-solve/domain/entities/image.entity';

@Injectable({
    providedIn: 'root',
})
export class CameraService {
    async takePicture(source: CameraSource) {
        const image = await Camera.getPhoto({
            quality: 90,
            // allowEditing: true,
            // correctOrientation: true,
            // width: 800,
            // height: 600,
            // presentationStyle: 'fullscreen',
            // saveToGallery: true,
            // promptLabelHeader: 'Tomar foto',
            // promptLabelCancel: 'Cancelar',
            // webUseInput: true,
            resultType: CameraResultType.Uri,
            source,
        });
        return image;
    }

    async imageToFile(image: Image): Promise<File> {
        const response = await fetch(image.webPath!);
        const blob = await response.blob();
        const ext = image.format ?? 'jpeg';
        const mime = blob.type ?? `image/${ext}`;

        return new File([blob], `image.${ext}`, { type: mime });
    }

    async imageToBlob(image: Image): Promise<Blob> {
        const response = await fetch(image.webPath!);
        return await response.blob();
    }

    async imagesToFiles(images: Image[]): Promise<File[]> {
        if (!images.length) return [];
        return await Promise.all(images.map((image) => this.imageToFile(image)));
    }
}
