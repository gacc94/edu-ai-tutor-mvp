import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

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
}
