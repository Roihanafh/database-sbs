import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { MESSAGES } from '@nestjs/core/constants';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    //create user
    @Post('create')
    async createUser(@Body() createUserDto: CreateUserDto) {
        await this.usersService.create(createUserDto);
        return { message: 'User created successfully' };
    }

    //get all users
    @Get()
    getUsers() {
        return this.usersService.findAll();
    }

    //get user by id
    @Get(':id')
    getUserById(@Param('id') id: number) {
        return this.usersService.findOne(id);
    }

    //update user by id
    @Patch('update/:id')
    async updateUser(@Param('id') id: number, @Body() updateUserDto: Partial<CreateUserDto>) {
        await this.usersService.update(id, updateUserDto);
        return { message: 'User updated successfully' };
    }

    //delete user by id
    @Delete('delete/:id')
    async deleteUser(@Param('id') id: number) {
        await this.usersService.remove(id);
        return { message: 'User deleted successfully' };
    }
}
