

import {IsNotEmpty, IsString} from 'class-validator';

export class CreateDocumentDto {
    @IsNotEmpty()
    @IsString()
    title:string

    @IsString()
    @IsNotEmpty()
    content:string
    
}