import { Component, CUSTOM_ELEMENTS_SCHEMA, input, OnInit } from '@angular/core';
import { IonItem, IonImg } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { MessageState } from '@features/chat-math-solve/application/states/interfaces/chat-math.state.interface';

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
                <p class="chat__bubble-text">{{ message().content }}</p>
            </div>
        </ion-item>
    `,
    styleUrls: ['./chat-item.component.scss'],
    imports: [IonItem, IonImg, CommonModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChatItemComponent implements OnInit {
    message = input.required<MessageState>();
    constructor() {}

    ngOnInit() {}
}
