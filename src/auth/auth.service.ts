import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

type AuthInput = {
    email: string;
    password: string;
};

type SignInData = {
    userId: number;
    email: string;
};

type AuthResult = {
    accessToken: string;
    userId: number;
    email: string;
}
@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {}

    async authenthicate(input: AuthInput): Promise<AuthResult | null> {
        const user = await this.validateUser(input);
        if (!user) {
            throw new UnauthorizedException();
        }

        return {
            accessToken: 'mocked-jwt-token',
            userId: user.userId,
            email: user.email,
        };
    }
    
    async validateUser(input: AuthInput): Promise<SignInData | null> {
        const user = await this.userService.findUserByEmail(input.email);
        if (user && user.password === input.password) {
            return { userId: user.id, email: user.email };
        }
        return null;
    }
}
