import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DocumentModule } from './document/document.module';
import { UserModule } from './user/user.module';
import {ConfigModule} from '@nestjs/config'
import {SequelizeModule} from '@nestjs/sequelize'
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    SequelizeModule.forRoot({
      dialect:'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true, 
      synchronize: true, 

    }),
    AuthModule, DocumentModule, UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
