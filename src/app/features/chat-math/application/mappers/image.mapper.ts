import { Image } from '@features/chat-math/domain/entities/image.entity';
import { ImageState } from '@features/chat-math/application/states/interfaces/image.state';

export class ImageMapper {
    /**
     *
     * @param image
     * @returns
     */
    static toState(image: Image): ImageState {
        return {
            base64String: image.base64String,
            dataUrl: image.dataUrl,
            path: image.path,
            webPath: image.webPath,
            exif: image.exif,
            format: image.format,
            saved: image.saved,
        };
    }

    /**
     *
     * @param imageState
     * @returns
     */
    static toDomain(imageState: ImageState): Image {
        return new Image({
            base64String: imageState.base64String,
            dataUrl: imageState.dataUrl,
            path: imageState.path,
            webPath: imageState.webPath,
            exif: imageState.exif,
            format: imageState.format,
            saved: imageState.saved,
        });
    }

    /**
     * Converts an array of Image entities to an array of File objects
     * @param images
     * @returns
     */
    static toFiles(images: Image[]): Promise<File[]> {
        return Promise.all(images.map((image) => image.getFile()));
    }
}
