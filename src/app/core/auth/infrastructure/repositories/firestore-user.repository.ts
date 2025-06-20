import { Injectable, inject } from '@angular/core';
import { 
    Firestore, 
    doc, 
    getDoc, 
    setDoc, 
    updateDoc, 
    deleteDoc,
    query,
    where,
    getDocs,
    collection
} from '@angular/fire/firestore';
import { UserRepository } from '@core/auth/domain/repositories/user.repository';
import { User } from '@core/auth/domain/entities/user.entity';
import { UserInfrastructureMapper } from '../mappers/user.mapper';
import { UserDto } from '../dtos/user.dto';
import { UserId } from '@core/auth/domain/value-objects/UserId';
import { Email } from '@core/auth/domain/value-objects/Email';

@Injectable({ providedIn: 'root' })
export class FirestoreUserRepository implements UserRepository {
    private readonly _firestore = inject(Firestore);
    private readonly _collectionName = 'users';

    /**
     * Creates a new user in Firestore
     * @param user The user to create
     * @throws Error if user creation fails
     */
    async createUser(user: User): Promise<void> {
        try {
            const userDto = UserInfrastructureMapper.toDto(user);
            const userDocRef = doc(this._firestore, this._collectionName, user.id.value);
            await setDoc(userDocRef, userDto);
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Failed to create user');
        }
    }

    /**
     * Retrieves a user by their ID
     * @param userId The user's ID
     * @returns The user if found, null otherwise
     * @throws Error if the operation fails
     */
    async getUserById(userId: UserId): Promise<User | null> {
        try {
            const userDocRef = doc(this._firestore, this._collectionName, userId.value);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                return null;
            }

            const userData = userDoc.data() as UserDto;
            return UserInfrastructureMapper.toDomain(userData);
        } catch (error) {
            console.error('Error getting user:', error);
            throw new Error('Failed to get user');
        }
    }

    /**
     * Updates an existing user in Firestore
     * @param user The user with updated information
     * @throws Error if the update fails
     */
    async updateUser(user: User): Promise<void> {
        try {
            const userDto = UserInfrastructureMapper.toDto(user);
            const userDocRef = doc(this._firestore, this._collectionName, user.id.value);
            await updateDoc(userDocRef, { 
                ...userDto,
                updatedAt: new Date() // Ensure updatedAt is always current
            });
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('Failed to update user');
        }
    }

    /**
     * Deletes a user from Firestore
     * @param userId The ID of the user to delete
     * @throws Error if the deletion fails
     */
    async deleteUser(userId: UserId): Promise<void> {
        try {
            const userDocRef = doc(this._firestore, this._collectionName, userId.value);
            await deleteDoc(userDocRef);
        } catch (error) {
            console.error('Error deleting user:', error);
            throw new Error('Failed to delete user');
        }
    }

    /**
     * Checks if a user with the given ID exists
     * @param userId The user ID to check
     * @returns True if the user exists, false otherwise
     */
    async userExists(userId: UserId): Promise<boolean> {
        try {
            const userDocRef = doc(this._firestore, this._collectionName, userId.value);
            const userDoc = await getDoc(userDocRef);
            return userDoc.exists();
        } catch (error) {
            console.error('Error checking if user exists:', error);
            return false;
        }
    }

    /**
     * Retrieves a user by their email address
     * @param email The email address to search for
     * @returns The user if found, null otherwise
     * @throws Error if the operation fails
     */
    async getUserByEmail(email: Email): Promise<User | null> {
        try {
            const usersRef = collection(this._firestore, this._collectionName);
            const q = query(usersRef, where('email', '==', email.value));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                return null;
            }

            // Get the first matching document
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data() as UserDto;
            
            return UserInfrastructureMapper.toDomain(userData);
        } catch (error) {
            console.error('Error getting user by email:', error);
            throw new Error('Failed to get user by email');
        }
    }
}
