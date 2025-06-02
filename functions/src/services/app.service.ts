import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello from NestJS on Firebase Functions!';
    }

    getUser(id: string) {
        return {
            id,
            name: `Usuario ${id}`,
            email: `user${id}@example.com`,
        };
    }

    createUser(userData: any) {
        return {
            message: 'Usuario creado exitosamente',
            user: {
                id: Date.now().toString(),
                ...userData,
            },
        };
    }
}
