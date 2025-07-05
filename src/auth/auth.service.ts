import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt'
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
@Injectable()
export class AuthService {
    constructor(
    private readonly userService:UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginData:LoginDto){
    const user = await this.userService.findByEmail(loginData.email)
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
   async register(registerDto:CreateUserDto){
        const existing = await this.userService.findByEmail(registerDto.email);
        if(existing){
            throw new ConflictException('Email already in use')
        }
        const hashpassword = await bcrypt.hash(registerDto.password,10) 
        const user = await this.userService.create({
            ...registerDto,password:hashpassword
        })

        const payload = {sub:user.id,email:user.email,role:user.role};

        return {
            access_token: this.jwtService.sign(payload)
        }
    }


}
