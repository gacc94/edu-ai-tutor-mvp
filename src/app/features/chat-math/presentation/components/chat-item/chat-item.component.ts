import { Component, CUSTOM_ELEMENTS_SCHEMA, input, signal } from '@angular/core';
import { IonItem, IonImg } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { MessageState } from '@features/chat-math/application/states/interfaces/chat-math.state.interface';
import { ChatActionsComponent } from '../chat-actions/chat-actions.component';
import { KatexOptions, MarkdownComponent } from 'ngx-markdown';

@Component({
    selector: 'app-chat-item',
    template: `
        <ion-item class="chat__item" [ngClass]="'chat__item--' + message().role">
            <div class="chat__bubble" [ngClass]="'chat__bubble--' + message().role">
                @if (message().images?.length) {
                <div class="chat__images">
                    @for (image of message().images; track $index) {
                    <ion-img [src]="image.webPath" class="chat__image"></ion-img>
                    }
                </div>
                }
                <markdown [katex]="true" [katexOptions]="katexOptions()" [data]="message().content"></markdown>
                @if (message().role === 'ai') {
                <app-chat-actions [content]="message().content"></app-chat-actions>
                }
            </div>
        </ion-item>
    `,
    styleUrls: ['./chat-item.component.scss'],
    imports: [IonItem, IonImg, CommonModule, ChatActionsComponent, MarkdownComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChatItemComponent {
    message = input.required<MessageState>();

    katexOptions = signal<KatexOptions>({
        throwOnError: false,
        displayMode: false,
    });
}
