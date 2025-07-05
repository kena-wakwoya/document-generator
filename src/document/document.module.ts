import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Document } from './document.model';

@Module({
  imports:[
    SequelizeModule.forFeature([Document])
  ],
  controllers: [DocumentController],
  providers: [DocumentService]
})
export class DocumentModule {}
