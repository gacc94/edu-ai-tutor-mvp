import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

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
}
