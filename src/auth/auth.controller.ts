import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

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
    getProfile(@Req() req: any) {
        return {
            message: 'You are authenticated',
            user: req.user,
        };
    }
}