import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
   constructor(
      @InjectModel(User)
      private userModel: typeof User,
    ) {}
    async findAll(): Promise<User[]> {
      return this.userModel.findAll();
    }
    async findOne(id: number): Promise<User | null> {
      return this.userModel.findByPk(id);
    }
    async create(userData: CreateUserDto): Promise<User> {
      return this.userModel.create(userData as any);
    }
    async update(id: number, userData:UpdateUserDto): Promise<[number, User[]]> {
      return this.userModel.update(userData, {
        where: { id },
        returning: true, // Return the updated record
      });
    }
    async remove(id: number): Promise<void> {
      const user = await this.findOne(id);
      await user?.destroy();
    } 
}
