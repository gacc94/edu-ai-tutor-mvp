import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
    browserPopupRedirectResolver,
    browserSessionPersistence,
    initializeAuth,
    provideAuth,
} from '@angular/fire/auth';
import {
    initializeFirestore,
    persistentLocalCache,
    provideFirestore,
} from '@angular/fire/firestore';
import { environment } from '@envs/environment';

const fbApp = () => initializeApp(environment.firebase);
const authApp = () =>
    initializeAuth(fbApp(), {
        persistence: browserSessionPersistence,
        popupRedirectResolver: browserPopupRedirectResolver,
    });

const firestoreApp = () =>
    initializeFirestore(fbApp(), {
        localCache: persistentLocalCache(),
    });

export const firebaseProviders = [
    provideFirebaseApp(fbApp),
    provideAuth(authApp),
    provideFirestore(firestoreApp),
];
