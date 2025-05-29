import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-typing-loading',
    template: `
        <div class="typing-container">
            <div class="typing-content">
                <div class="typing-bubble">
                    <div class="typing-text">Escribiendo</div>
                    <div class="typing-dots">
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./typing-loading.component.scss'],
})
export class TypingLoadingComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
