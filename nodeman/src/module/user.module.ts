import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../model/user.entity';
import { UserService } from '../service/user.service';
import { AppController } from '../app.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AppController],
    providers: [UserService,],
    exports: [UserService]
})
export class UserModule { }
