import { Injectable, inject } from '@angular/core';
import { SendMessageUseCase } from '@features/chat-math/application/uses-cases/send-message.use-case';
import { PrepareSendingMessageUseCase } from '@features/chat-math/application/uses-cases/prepare-sending-message.use-case';
import { Message } from '@features/chat-math/domain/entities/message.entity';
import { TakePictureUseCase } from '@features/chat-math/application/uses-cases/take-picture.use-case';
import { CameraSource } from '@capacitor/camera';
import { CreditsService } from '@shared/services/credits.service';
import { IonicUtilsService } from '@shared/services/ionic-utils.service';

@Injectable({ providedIn: 'root' })
export class ChatService {
    private readonly _sendMessageUseCase = inject(SendMessageUseCase);
    private readonly _prepareSendingMessageUseCase = inject(PrepareSendingMessageUseCase);
    private readonly _takePictureUseCase = inject(TakePictureUseCase);
    private readonly _creditsService = inject(CreditsService);
    private readonly _ionicUtils = inject(IonicUtilsService);

    async sendMessage(message: Message): Promise<boolean> {
        // Check if user has credits
        if (!this._creditsService.$hasCredits()) {
            await this._showNoCreditsAlert();
            return false;
        }

        // Show warning if credits are low
        if (this._creditsService.$isLowCredits()) {
            await this._showLowCreditsWarning();
        }

        try {
            // Consume credits before sending message
            const creditsConsumed = await this._creditsService.consumeCredits(1, 'Pregunta matemática enviada');

            if (!creditsConsumed) {
                await this._showNoCreditsAlert();
                return false;
            }

            // Send the message
            await this._sendMessageUseCase.execute(message);

            // Show success feedback
            if (this._creditsService.$currentCredits() > 0) {
                await this._ionicUtils.presentToast({
                    message: `✨ Pregunta enviada! Te quedan ${this._creditsService.$currentCredits()} créditos`,
                    duration: 2000,
                    color: 'success',
                    position: 'top',
                });
            }

            return true;
        } catch (error) {
            // Refund credits if message failed to send
            await this._creditsService.addCredits(1, 'Reembolso por error en envío');

            await this._ionicUtils.presentToast({
                message: 'Error al enviar mensaje. Crédito reembolsado.',
                duration: 3000,
                color: 'danger',
            });

            throw error;
        }
    }

    prepareSendingMessage(message: string): Promise<Message> {
        return this._prepareSendingMessageUseCase.execute(message);
    }

    takePicture(source: CameraSource): Promise<void> {
        return this._takePictureUseCase.execute(source);
    }

    private async _showNoCreditsAlert(): Promise<void> {
        // await this._ionicUtils.presentAlert({
        //     header: '💎 Sin Créditos',
        //     message: `
        //         <div style="text-align: center; padding: 1rem;">
        //             <p style="color: var(--color-text-secondary); margin-bottom: 1rem;">
        //                 No tienes créditos suficientes para enviar esta pregunta.
        //             </p>
        //             <p style="color: var(--color-accent); font-weight: 600;">
        //                 ¡No te preocupes! Puedes reiniciar tus créditos para continuar aprendiendo.
        //             </p>
        //         </div>
        //     `,
        //     buttons: [
        //         {
        //             text: 'Cancelar',
        //             role: 'cancel',
        //         },
        //         {
        //             text: 'Reiniciar Créditos',
        //             handler: async () => {
        //                 await this._creditsService.resetCredits();
        //                 await this._ionicUtils.presentToast({
        //                     message: '🎉 ¡Créditos reiniciados! Ya puedes continuar',
        //                     duration: 3000,
        //                     color: 'success',
        //                 });
        //             },
        //         },
        //     ],
        // });
    }

    private async _showLowCreditsWarning(): Promise<void> {
        const currentCredits = this._creditsService.$currentCredits();

        await this._ionicUtils.presentToast({
            message: `⚠️ Te quedan solo ${currentCredits} créditos`,
            duration: 2500,
            color: 'warning',
            position: 'top',
        });
    }
}
