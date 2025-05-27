import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { firebaseProviders } from './app/shared/config/firebase.config';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from '@envs/environment';
import { appInitializerProviders } from './app/shared/config/app-initializer.config';
import { providers } from '@features/chat-math-solve/infrastructure/providers/provider';

if (environment.production) {
    enableProdMode();
}

const chatProviders = [...providers];

bootstrapApplication(AppComponent, {
    providers: [
        ...appInitializerProviders,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        provideIonicAngular(),
        provideRouter(routes, withPreloading(PreloadAllModules)),
        provideHttpClient(withFetch()),
        //TODO: Firebase config start
        ...firebaseProviders,
        importProvidersFrom(),
        ...chatProviders,
    ],
});
