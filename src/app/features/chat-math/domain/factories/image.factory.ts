import { Image } from '../entities/image.entity';
import { Photo } from '@capacitor/camera';

export class ImageFactory {
    static create(photo: Photo): Image {
        return new Image({
            webPath: photo.webPath,
            format: photo.format,
            exif: photo.exif,
            path: photo.path,
            dataUrl: photo.dataUrl,
            base64String: photo.base64String,
            saved: false,
        });
    }
}
