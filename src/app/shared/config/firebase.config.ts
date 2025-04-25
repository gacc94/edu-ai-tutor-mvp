import { isDevMode } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
    browserPopupRedirectResolver,
    browserSessionPersistence,
    connectAuthEmulator,
    initializeAuth,
    provideAuth,
} from '@angular/fire/auth';
import {
    connectFirestoreEmulator,
    initializeFirestore,
    persistentLocalCache,
    provideFirestore,
} from '@angular/fire/firestore';
import { connectFunctionsEmulator, getFunctions, provideFunctions } from '@angular/fire/functions';
import { environment } from '@envs/environment';

//TODO: firebase init
const fbApp = () => initializeApp(environment.firebase);

//TODO: Config Firebase Auth
const authApp = () => {
    const auth = initializeAuth(fbApp(), {
        persistence: browserSessionPersistence,
        popupRedirectResolver: browserPopupRedirectResolver,
    });

    if (isDevMode()) {
        // TODO: Configure the emulator for authentication
        connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    }

    return auth;
};

//TODO: Config Firebase Firestore
const firestoreApp = () => {
    const firestore = initializeFirestore(fbApp(), {
        localCache: persistentLocalCache(),
    });

    if (isDevMode()) {
        // TODO: Configure the emulator for Firestore
        connectFirestoreEmulator(firestore, 'localhost', 9092);
    }

    return firestore;
};

const functionsApp = () => {
    const functions = getFunctions(fbApp());
    if (isDevMode()) {
        // TODO: Configure the emulator for Functions
        connectFunctionsEmulator(functions, 'localhost', 9098);
    }
    return functions;
};

export const firebaseProviders = [
    provideFirebaseApp(fbApp),
    provideAuth(authApp),
    provideFirestore(firestoreApp),
    provideFunctions(functionsApp),
];
