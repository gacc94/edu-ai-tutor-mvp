import { User } from '../entities/user.entity';
import { UserId } from '../value-objects/UserId';
import { Email } from '../value-objects/Email';

/**
 * Interface for user persistence operations
 */
export interface UserRepository {
    /**
     * Creates a new user in the data store
     * @param user The user to create
     * @throws Error if user already exists or creation fails
     */
    createUser(user: User): Promise<void>;
    
    /**
     * Retrieves a user by their unique identifier
     * @param userId The user's unique identifier
     * @returns The user if found, null otherwise
     */
    getUserById(userId: UserId): Promise<User | null>;
    
    /**
     * Updates an existing user in the data store
     * @param user The user with updated information
     * @throws Error if user doesn't exist or update fails
     */
    updateUser(user: User): Promise<void>;
    
    /**
     * Deletes a user from the data store
     * @param userId The unique identifier of the user to delete
     * @throws Error if user doesn't exist or deletion fails
     */
    deleteUser(userId: UserId): Promise<void>;
    
    /**
     * Checks if a user with the given ID exists
     * @param userId The user ID to check
     * @returns True if user exists, false otherwise
     */
    userExists(userId: UserId): Promise<boolean>;
    
    /**
     * Retrieves a user by their email address
     * @param email The email address to search for
     * @returns The user if found, null otherwise
     */
    getUserByEmail?(email: Email): Promise<User | null>;
}
