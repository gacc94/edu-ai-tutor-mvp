import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { SafeArea } from '@capacitor-community/safe-area';
import { Camera } from '@capacitor/camera';

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
        //TODO: SafeArea config
        const { enable } = SafeArea;
        await enable({
            config: {
                customColorsForSystemBars: true,
                statusBarColor: '#000000',
                statusBarContent: 'light',
                navigationBarColor: '#000000',
                navigationBarContent: 'light',
                offset: 2,
            },
        });

        //TODO: Camera config
        this.requestPermissions();
    }

    async requestPermissions() {
        const { camera, photos } = await Camera.checkPermissions();

        if (camera !== 'granted' || photos !== 'granted') {
            const status = await Camera.requestPermissions({
                permissions: ['camera', 'photos'],
            });

            if (status.camera !== 'granted') {
                console.log('Camera permission denied');
            }

            if (status.photos !== 'granted') {
                console.log('Photos permission denied');
            }
        }
    }
}
