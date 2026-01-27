import { Controller, HttpStatus, HttpCode, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';

class LoginDto {
    email: string;
    password: string;
}

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: 200, description: 'Login successful, returns JWT token' })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: { type: 'string', example: 'admin@smartbiz.com' },
                password: { type: 'string', example: 'hashed_password_admin' },
            },
            required: ['email', 'password'],
        },
    })
    login(@Body() input: { email: string; password: string }) {
        return this.authService.authenthicate(input);
    }
}
