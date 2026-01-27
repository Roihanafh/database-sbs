import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors, NotFoundException, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('create')
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    async createUser(@Body() createUserDto: CreateUserDto) {
        await this.usersService.create(createUserDto);
        return { message: 'User created successfully' };
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Return all users' })
    getUsers() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiResponse({ status: 200, description: 'Return user by ID' })
    @ApiResponse({ status: 404, description: 'User not found' })
    getUserById(@Param('id') id: number) {
        return this.usersService.findOne(id);
    }

    @Patch('update/:id')
    @ApiOperation({ summary: 'Update user by ID' })
    @ApiResponse({ status: 200, description: 'User updated successfully' })
    async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        await this.usersService.update(id, updateUserDto);
        return { message: 'User updated successfully' };
    }

    @Delete('delete/:id')
    @ApiOperation({ summary: 'Delete user by ID' })
    @ApiResponse({ status: 200, description: 'User deleted successfully' })
    async deleteUser(@Param('id') id: number) {
        await this.usersService.remove(id);
        return { message: 'User deleted successfully' };
    }
}
