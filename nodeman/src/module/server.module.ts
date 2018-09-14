import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerController } from '../controller/server.controller';
import { Server } from '../model/server.entity';
import { ServerService } from '../service/server.service';

@Module({
    imports: [TypeOrmModule.forFeature([Server]),],
    providers: [ServerService,],
    controllers: [ServerController,],
})
export class ServerModule { }