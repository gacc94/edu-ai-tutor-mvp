import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller('api')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('users/:id')
    getUser(@Param('id') id: string) {
        return this.appService.getUser(id);
    }

    @Post('users')
    createUser(@Body() userData: any) {
        return this.appService.createUser(userData);
    }
}
