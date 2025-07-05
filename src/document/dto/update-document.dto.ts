

import {IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class UpdateDocumentDto {
    @IsOptional()
    @IsString()
    title:string

    @IsOptional()
    @IsString()
    content:string
    
}