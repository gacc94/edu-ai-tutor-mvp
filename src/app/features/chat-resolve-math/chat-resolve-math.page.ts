import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    IonContent,
    IonInput,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonAvatar,
    IonToolbar,
    IonTitle,
    IonFooter,
    IonBackButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
    arrowBackOutline,
    happyOutline,
    cameraOutline,
    paperPlaneOutline,
    cogOutline, // Placeholder for AI avatar
} from 'ionicons/icons';

// Define the message structure
interface Message {
    id: string;
    sender: 'user' | 'ai';
    text: string;
    timestamp: Date;
    avatarIcon?: string; // For AI avatar
}
@Component({
    selector: 'app-chat-resolve-math',
    templateUrl: './chat-resolve-math.page.html',
    styleUrls: ['./chat-resolve-math.page.scss'],
    standalone: true, // Ensure this component is standalone
    imports: [
        CommonModule,
        IonInput,
        IonButton,
        IonIcon,
        IonList,
        IonItem,
        IonAvatar,
        IonToolbar,
        IonTitle,
        IonContent,
        IonFooter,
        IonBackButton,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class ChatResolveMathPage {
    @ViewChild(IonContent) contentArea!: IonContent;

    messages: Message[] = [
        {
            id: '1',
            sender: 'user',
            text: 'Hello Ai Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?Hello! How can I assist you today?',
            timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        },
        {
            id: '2',
            sender: 'ai',
            text: 'Hello! How can I assist you today?',
            timestamp: new Date(Date.now() - 4 * 60 * 1000),
            avatarIcon: 'cog-outline',
        },
        {
            id: '3',
            sender: 'user',
            text: 'how to learn fast ?',
            timestamp: new Date(Date.now() - 3 * 60 * 1000),
        },
        {
            id: '4',
            sender: 'ai',
            text: 'Learning fast can be achieved through a combination of effective strategies and a growth mindset',
            timestamp: new Date(Date.now() - 2 * 60 * 1000),
            avatarIcon: 'cog-outline',
        },
        {
            id: '5',
            sender: 'user',
            text: 'write the best quote in the world',
            timestamp: new Date(Date.now() - 1 * 60 * 1000),
        },
    ];
    newMessage: string = '';

    constructor() {
        addIcons({
            arrowBackOutline,
            happyOutline,
            cameraOutline,
            paperPlaneOutline,
            cogOutline,
        });
    }

    sendMessage(): void {
        if (this.newMessage.trim() === '') {
            return;
        }

        const userMessage: Message = {
            id: Date.now().toString(), // Simple unique ID
            sender: 'user',
            text: this.newMessage,
            timestamp: new Date(),
        };
        this.messages.push(userMessage);
        this.newMessage = '';
        this.scrollToBottom();

        // Simulate AI response
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'ai',
                text: `I received your message: "${userMessage.text}". I'm still learning to process math problems from text. Try uploading an image!`,
                timestamp: new Date(),
                avatarIcon: 'cog-outline',
            };
            this.messages.push(aiResponse);
            this.scrollToBottom();
        }, 1000);
    }

    handleImageUpload(): void {
        const aiResponse: Message = {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: 'Image upload feature is coming soon! For now, please describe your math problem.',
            timestamp: new Date(),
            avatarIcon: 'cog-outline',
        };
        this.messages.push(aiResponse);
        this.scrollToBottom();
    }

    trackByMessageId(index: number, message: Message): string {
        return message.id;
    }

    private scrollToBottom(): void {
        setTimeout(() => {
            this.contentArea?.scrollToBottom(300);
        }, 100);
    }
}
