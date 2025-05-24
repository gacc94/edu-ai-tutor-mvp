import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { SafeArea } from '@capacitor-community/safe-area';
@Component({
    selector: 'app-root',
    template: `
        <ion-app>
            <ion-router-outlet></ion-router-outlet>
        </ion-app>
    `,
    standalone: true,
    imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
    constructor() {
        // Establecer modo dark por defecto
        document.body.classList.add('dark');
        console.log('Environment: ===>', environment.name);
    }

    async ngOnInit(): Promise<void> {
        const { enable } = SafeArea;
        await enable({
            config: {
                customColorsForSystemBars: true,
                statusBarColor: '#ffffff',
                statusBarContent: 'dark',
                navigationBarColor: '#ffffff',
                navigationBarContent: 'dark',
                offset: 2,
            },
        });
    }
}
