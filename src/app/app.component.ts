import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { SafeArea } from '@capacitor-community/safe-area';
@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: true,
    imports: [IonApp, IonRouterOutlet, CommonModule],
})
export class AppComponent {
    constructor(private router: Router) {
        // Establecer modo dark por defecto
        document.body.classList.add('dark');
        console.log('Environment: ===>', environment.name);
    }

    async ngOnInit(): Promise<void> {
        const { enable } = SafeArea;
        await enable({
            config: {
                customColorsForSystemBars: true,
                statusBarColor: '#0054e9',
                statusBarContent: 'light',
                navigationBarColor: '#0054e9',
                navigationBarContent: 'light',
                offset: 2,
            },
        });
    }
}
