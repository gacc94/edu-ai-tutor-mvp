import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
    browserPopupRedirectResolver,
    browserSessionPersistence,
    initializeAuth,
    provideAuth,
} from '@angular/fire/auth';
import { initializeFirestore, persistentLocalCache, provideFirestore } from '@angular/fire/firestore';
import { environment } from '@envs/environment';

//TODO: firebase init
const fbApp = () => initializeApp(environment.firebase);

//TODO: Config Firebase Auth
const authApp = () => {
    const auth = initializeAuth(fbApp(), {
        persistence: browserSessionPersistence,
        popupRedirectResolver: browserPopupRedirectResolver,
    });

    if (!environment.production) {
        // TODO: Configure the emulator for authentication
        import('@angular/fire/auth').then(({ connectAuthEmulator }) => {
            connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
        });
    }

    return auth;
};

//TODO: Config Firebase Firestore
const firestoreApp = () => {
    const firestore = initializeFirestore(fbApp(), {
        localCache: persistentLocalCache(),
    });

    if (!environment.production) {
        // TODO: Configure the emulator for Firestore
        import('@angular/fire/firestore').then(({ connectFirestoreEmulator }) => {
            connectFirestoreEmulator(firestore, 'localhost', 9092);
        });
    }

    return firestore;
};

export const firebaseProviders = [provideFirebaseApp(fbApp), provideAuth(authApp), provideFirestore(firestoreApp)];
