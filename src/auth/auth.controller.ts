import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) { }

    @Post('register')
    register(@Body() body: any) {
        return this.authService.register(body);
    }

    @Post('login')
    login(@Body() body: any) {
        return this.authService.login(body);
    }

    @Get('me')
    @UseGuards(JwtGuard)
   async getProfile(@Req() req: any) {
        const fullUser = await this.usersService.findById(req.user.userId);
        
        return {
            message: 'You are authenticated',
            user: fullUser, 
        };
    }
}