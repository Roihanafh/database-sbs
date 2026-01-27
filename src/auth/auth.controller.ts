import { Controller, HttpStatus, HttpCode, Post, NotImplementedException, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() input: { email: string; password: string }) {
        return this.authService.authenthicate(input);
    }

}
