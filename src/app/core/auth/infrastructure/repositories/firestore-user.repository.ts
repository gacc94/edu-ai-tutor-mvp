import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc, updateDoc, deleteDoc, collection } from '@angular/fire/firestore';
import { UserRepository } from '@core/auth/domain/repositories/user.repository';
import { User } from '@core/auth/domain/entities/user.entity';
import { UserId } from '@core/auth/domain/value-objects/UserId';
import { UserInfrastructureMapper } from '../mappers/user.mapper';

@Injectable({ providedIn: 'root' })
export class FirestoreUserRepository implements UserRepository {
    private readonly COLLECTION_NAME = 'users';

    constructor(private _firestore: Firestore) {}

    async save(user: User): Promise<void> {
        try {
            const userRef = doc(this._firestore, this.COLLECTION_NAME, user.id.value);
            const firestoreDto = UserInfrastructureMapper.toFirestoreDto(user);
            await setDoc(userRef, firestoreDto.toFirestore());
        } catch (error) {
            throw new Error(`Failed to save user: ${error}`);
        }
    }

    async findById(id: UserId): Promise<User | null> {
        try {
            const userRef = doc(this._firestore, this.COLLECTION_NAME, id.value);
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                return UserInfrastructureMapper.fromFirestoreData(docSnap.id, docSnap.data());
            }

            return null;
        } catch (error) {
            throw new Error(`Failed to find user: ${error}`);
        }
    }

    async update(user: User): Promise<void> {
        try {
            const userRef = doc(this._firestore, this.COLLECTION_NAME, user.id.value);
            const firestoreDto = UserInfrastructureMapper.toFirestoreDto(user);
            await updateDoc(userRef, firestoreDto.toFirestore());
        } catch (error) {
            throw new Error(`Failed to update user: ${error}`);
        }
    }

    async delete(id: UserId): Promise<void> {
        try {
            const userRef = doc(this._firestore, this.COLLECTION_NAME, id.value);
            await deleteDoc(userRef);
        } catch (error) {
            throw new Error(`Failed to delete user: ${error}`);
        }
    }

    async exists(id: UserId): Promise<boolean> {
        try {
            const userRef = doc(this._firestore, this.COLLECTION_NAME, id.value);
            const docSnap = await getDoc(userRef);
            return docSnap.exists();
        } catch (error) {
            throw new Error(`Failed to check if user exists: ${error}`);
        }
    }
}
