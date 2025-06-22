import { User } from '../entities/user.entity';
import { UserId } from '../value-objects/UserId';

export interface UserRepository {
    save(user: User): Promise<void>;
    findById(id: UserId): Promise<User | null>;
    update(user: User): Promise<void>;
    delete(id: UserId): Promise<void>;
    exists(id: UserId): Promise<boolean>;
}
