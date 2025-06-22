import { Injectable, inject } from '@angular/core';
import { CameraService } from '@shared/services/camera.service';
import { ImageFactory } from '@features/chat-math/domain/factories/image.factory';
import { ImageMapper } from '@features/chat-math/application/mappers/image.mapper';
import { IMAGES_SELECTED_STATE } from '@features/chat-math/application/states/states';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { CameraSource } from '@capacitor/camera';

@Injectable({ providedIn: 'root' })
export class TakePictureUseCase {
    private readonly _cameraService = inject(CameraService);
    private readonly _imagesSelectedState = inject(IMAGES_SELECTED_STATE);

    async execute(source: CameraSource): Promise<void> {
        const photo = await this._cameraService.takePicture(source);
        const image = ImageFactory.create(photo);
        const imagesState = this._imagesSelectedState.$state() ?? [];

        const imageState = ImageMapper.toState(image);

        const images = [...imagesState, imageState];
        this._imagesSelectedState.save(images);
    }
}
