import { EnvironmentProviders, isDevMode } from '@angular/core';
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
import { connectStorageEmulator, getStorage, provideStorage } from '@angular/fire/storage';
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

// Firebase Firestore Configuration
const firestoreApp = () => {
    const firestore = initializeFirestore(fbApp(), {
        localCache: persistentLocalCache(),
    });

    if (isDevMode()) {
        // Configure the emulator for Firestore (corrected port)
        connectFirestoreEmulator(firestore, 'localhost', 9097);
    }

    return firestore;
};

// Firebase Functions Configuration
const functionsApp = () => {
    const functions = getFunctions(fbApp());
    if (isDevMode()) {
        // Configure the emulator for Functions
        connectFunctionsEmulator(functions, 'localhost', 9098);
    }
    return functions;
};

// Firebase Storage Configuration
const storageApp = () => {
    const storage = getStorage(fbApp());
    if (isDevMode()) {
        // Configure the emulator for Storage
        connectStorageEmulator(storage, 'localhost', 9096);
    }
    return storage;
};

export const firebaseProviders: EnvironmentProviders[] = [
    provideFirebaseApp(fbApp),
    provideAuth(authApp),
    provideFirestore(firestoreApp),
    provideFunctions(functionsApp),
    provideStorage(storageApp),
];
