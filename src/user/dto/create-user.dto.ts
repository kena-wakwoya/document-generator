
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, minLength, MinLength } from 'class-validator';
import { UserRole } from '../user.model';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    fullName:string

    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @MinLength(8,{
        message:'Password Length must be above 8 character'
    })
    password:string

    @IsOptional()
    @IsEnum(UserRole, {
        message: 'User role must be either user or admin',
    })
    role: UserRole;
}