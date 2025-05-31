import { Component, signal, WritableSignal } from '@angular/core';
import { IonFooter, IonIcon } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
    icon: string;
    label: string;
    url: string;
}

@Component({
    selector: 'app-footer',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
    template: `
        <ion-footer class="footer">
            <div class="footer__container">
                <div class="footer__tabs">
                    @for (item of items(); track $index) {
                    <div class="footer__tab" [routerLink]="item.url" routerLinkActive="footer__tab--active">
                        <div class="footer__icon-container">
                            <ion-icon [name]="item.icon"></ion-icon>
                        </div>
                        <span class="footer__label">{{ item.label }}</span>
                    </div>
                    }
                </div>
            </div>
        </ion-footer>
    `,
    imports: [IonFooter, IonIcon, RouterLink, CommonModule, RouterLinkActive],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FooterComponent {
    items: WritableSignal<MenuItem[]> = signal<MenuItem[]>([
        { icon: 'chatbox-ellipses', label: 'Chat', url: '/home' },
        { icon: 'grid', label: 'AI Assistants', url: '/ai-assistants' },
        { icon: 'time', label: 'History', url: '/history' },
        { icon: 'person', label: 'Profile', url: '/profile' },
    ]);
}
