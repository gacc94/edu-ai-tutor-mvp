import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonList, IonItem } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { Photo } from '@capacitor/camera';

interface Message {
    id: string;
    role: 'user' | 'ia';
    text: string;
    timestamp: Date;
    avatarIcon?: string;
    images?: Array<Photo>;
}
@Component({
    selector: 'app-chat-resolve-math',
    templateUrl: './chat-resolve-math.page.html',
    styleUrls: ['./chat-resolve-math.page.scss'],
    standalone: true,
    imports: [CommonModule, IonList, IonItem, IonContent, HeaderComponent, FooterComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class ChatResolveMathPage {
    // @ViewChild(IonContent) contentArea!: IonContent;

    area = viewChild(IonContent);

    messages: Message[] = [
        {
            id: '0',
            role: 'ia',
            text: `¡Hola! Soy tu asistente EduAiTutor. Estoy aquí para ayudarte a resolver tus ejercicios o dudas. 😊`,
            timestamp: new Date(),
        },
    ];
    newMessage: string = '';

    constructor() {}

    async sendMessage(message: any) {
        console.log({ message });
        if (message.message.trim() === '') {
            return;
        }

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            text: message.message,
            timestamp: new Date(),
            images: message.images,
        };
        this.messages.push(userMessage);
        this.newMessage = '';
        await this.scrollToBottom();

        // Simulate AI response
        setTimeout(async () => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: 'ia',
                text: `lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.`,
                timestamp: new Date(),
                avatarIcon: 'cog-outline',
            };
            this.messages.push(aiResponse);
        }, 1000);

        setTimeout(() => this.scrollToBottom(), 100);
    }

    handleImageUpload(image: Photo) {
        const aiResponse: Message = {
            id: (Date.now() + 1).toString(),
            role: 'ia',
            text: 'Image upload feature is coming soon! For now, please describe your math problem.',
            timestamp: new Date(),
            avatarIcon: 'cog-outline',
            images: [image],
        };
        this.messages.push(aiResponse);
        this.scrollToBottom();
    }

    private scrollToBottom() {
        return this.area()?.scrollToBottom(300);
    }
}
