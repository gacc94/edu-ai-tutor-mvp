import { Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { Share } from '@capacitor/share';
import { IonButton, IonIcon, isPlatform } from '@ionic/angular/standalone';
import { IonicUtilsService } from '@shared/services/ionic-utils.service';
import { Clipboard } from '@capacitor/clipboard';
import { DURATION_MS_TOAST, TEXT_WEB_SHARE_API_NOT_AVAILABLE, TEXT_COPY_TO_CLIPBOARD } from '@shared/utils/constants/';

@Component({
    selector: 'app-chat-actions',
    template: `
        <div class="chat__actions">
            <ion-button expand="full" fill="clear" size="small" (click)="handleCopyToClipboard()">
                <ion-icon slot="icon-only" name="copy-outline"></ion-icon>
            </ion-button>
            <ion-button expand="full" fill="clear" size="small" (click)="handleShareMessage()">
                <ion-icon slot="icon-only" name="share-social-outline"></ion-icon>
            </ion-button>
            <ion-button expand="full" fill="clear" size="small" (click)="downloadAsPdf()">
                <ion-icon slot="icon-only" name="download-outline"></ion-icon>
            </ion-button>
        </div>
    `,
    styleUrls: ['./chat-actions.component.scss'],
    imports: [IonButton, IonIcon],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChatActionsComponent {
    content = input.required<string>();

    constructor(private readonly _utilsService: IonicUtilsService) {}

    async handleCopyToClipboard(): Promise<void> {
        await Clipboard.write({
            string: this.content(),
        });

        if (isPlatform('desktop')) {
            this._utilsService.presentToast({
                message: TEXT_COPY_TO_CLIPBOARD,
                duration: DURATION_MS_TOAST,
            });
        }
    }

    async handleShareMessage(): Promise<void> {
        const { value } = await Share.canShare();
        if (!value) {
            this._utilsService.presentToast({
                message: TEXT_WEB_SHARE_API_NOT_AVAILABLE,
                duration: DURATION_MS_TOAST,
            });
            return;
        }
        await Share.share({
            title: 'AI Tutor Response',
            text: this.content(),
            dialogTitle: 'Compartir respuesta',
        });
    }

    async downloadAsPdf() {
        const contentElement = this.content();
        if (contentElement) {
            alert(
                'PDF download functionality will be implemented here. You might need to install jspdf and html2canvas.'
            );
            // Placeholder for PDF generation logic
            // Example using jspdf and html2canvas (requires installation and import):
            /*
            try {
                // Dynamically import the libraries to reduce initial bundle size
                const html2canvas = (await import('html2canvas')).default;
                const jsPDF = (await import('jspdf')).default;

                const canvas = await html2canvas(contentElement, {
                    // Optional: improve quality for high DPI screens
                    scale: window.devicePixelRatio > 1 ? window.devicePixelRatio : 1,
                    useCORS: true, // If your content includes images from other domains
                    logging: true, // For debugging
                });
                const imgData = canvas.toDataURL('image/png');

                // Calculate dimensions
                const pdf = new jsPDF({
                    orientation: 'p', // portrait
                    unit: 'mm',
                    format: 'a4'
                });
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth() - 20; // 10mm margin on each side
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                let currentHeight = 0;

                // Check if content fits on one page, otherwise split
                // This is a simplified version; more robust splitting might be needed for very long content
                if (pdfHeight <= pdf.internal.pageSize.getHeight() - 20) {
                    pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth, pdfHeight); // 10mm top/left margin
                } else {
                    // Basic multi-page (might need refinement for perfect splits)
                    let position = 0;
                    const pageHeight = pdf.internal.pageSize.getHeight() - 20; // Usable height per page
                    while(position < imgProps.height) {
                        const chunkHeight = Math.min(imgProps.height - position, (pageHeight / pdfWidth) * imgProps.width);
                        const pageCanvas = document.createElement('canvas');
                        pageCanvas.width = imgProps.width;
                        pageCanvas.height = chunkHeight;
                        const ctx = pageCanvas.getContext('2d');
                        ctx?.drawImage(canvas, 0, position, imgProps.width, chunkHeight, 0, 0, imgProps.width, chunkHeight);
                        const pageImgData = pageCanvas.toDataURL('image/png');
                        if (position > 0) {
                           pdf.addPage();
                        }
                        pdf.addImage(pageImgData, 'PNG', 10, 10, pdfWidth, (chunkHeight * pdfWidth) / imgProps.width);
                        position += chunkHeight;
                    }
                }
                pdf.save('ai-response.pdf');
            } catch (error) {
                console.error('Error generating PDF:', error);
                alert('Failed to generate PDF. See console for details. Make sure jspdf and html2canvas are installed.');
            }
            */
        } else {
            console.error('Message content element not found for PDF generation.');
            alert('Could not find message content to generate PDF.');
        }
    }
}
