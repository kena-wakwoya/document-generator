import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';

@Module({

  imports:[
    SequelizeModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService,SequelizeModule]
})
export class UserModule {}
