import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() regiserData:CreateUserDto){
        return this.userService.create(regiserData  )
    }

     @Get()
    async findAll(): Promise<User[]> {
      return this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User | null> {
      return this.userService.findOne(+id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
      const [numberOfAffectedRows, [updatedUser]] = await this.userService.update(+id, updateUserDto);
      return updatedUser; // Return the updated user
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content for successful deletion
    async remove(@Param('id') id: string): Promise<void> {
      await this.userService.remove(+id);
    }
}
