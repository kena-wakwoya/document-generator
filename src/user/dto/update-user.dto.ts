
import {  IsEnum,  IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from '../user.model';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    fullName:string

    @IsOptional()
    @IsString()
    email:string

    @IsOptional()
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