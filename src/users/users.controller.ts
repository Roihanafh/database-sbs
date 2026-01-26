import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Patch, Post, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
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
    getUserById() {
        return this.usersService.findOne;
    }

    //update user by id
    @Patch(':id')
    updateUser() {
        return this.usersService.update;
    }
    
    //delete user by id
    @Delete(':id')
    deleteUser() {
        return this.usersService.remove;
    }

}
