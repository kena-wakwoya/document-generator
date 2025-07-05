import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
   constructor(
      @InjectModel(User)
      private userModel: typeof User,
    ) {}
    async findAll(): Promise<User[]> {
      return this.userModel.findAll();
    }
    async findByEmail(email:string):Promise<User | null>{
       const user = await this.userModel.findOne({where:{email},raw:true})
       return user
    }

    async findOne(id: number): Promise<User | null> {
      return this.userModel.findByPk(id);
    }
    async create(userData: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        return this.userModel.create({
            ...userData,
            password: hashedPassword,
        });
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
