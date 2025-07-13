import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { firebaseProviders } from './app/shared/config/firebase.config';
import { enableProdMode, importProvidersFrom, provideZonelessChangeDetection } from '@angular/core';
import { environment } from '@envs/environment';
import { provideMarkdown } from 'ngx-markdown';
import { appInitializerProviders } from '@shared/config/app-initializer.config';
import { tokenInterceptor } from '@core/interceptors/token.interceptor';

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        provideZonelessChangeDetection(),
        ...appInitializerProviders,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        provideIonicAngular(),
        provideRouter(routes, withPreloading(PreloadAllModules)),
        provideHttpClient(withFetch(), withInterceptors([tokenInterceptor]), withInterceptorsFromDi()),
        ...firebaseProviders,
        importProvidersFrom(),
        provideMarkdown({}),
    ],
});
