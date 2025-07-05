import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Post('login')
    async login(@Body() loginData:LoginDto){
        return this.authService.login(loginData)
    }
    @Post('register')
    async register(@Body() registerUser:CreateUserDto){
        return this.authService.register(registerUser)
    }
}
