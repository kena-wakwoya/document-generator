import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
    constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginData:LoginDto){
    const user = await this.userModel.findOne({where:{email:loginData.email}})
    if(!user){
        throw new NotFoundException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    if (!isPasswordValid) {
      throw new NotFoundException('Invalid password');
    }
    const payload = {sub:user.id,email:user.email,role:user.role}
    const token = await this.jwtService.sign(payload);
    return  token 
  }

  
}
