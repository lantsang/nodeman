import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Server } from '../model/server.entity';
import { DeleteResult } from 'typeorm';
import { Observable } from 'rxjs';

//@Injectable()
export class ServerService {
  constructor(
    @InjectRepository(Server)
    private readonly serverListRepository: Repository<Server>,
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request)
    return request
  }

  async findAll(): Promise<Server[]> {
    return await this.serverListRepository.find();
  }

  async findById(Id): Promise<Server> {
    return await this.serverListRepository.findOne({ Id: Id });
  }

  async findByIds(Ids): Promise<Server[]> {
    return await this.serverListRepository.findByIds(Ids);
  }

  async findByIp(Ip): Promise<Server[]> {
    return await this.serverListRepository.find({ PhysicalServerAddress: Ip });
  }

  async delete(Id): Promise<DeleteResult> {
    return await this.serverListRepository.delete(Id);;
  }

  async updateSync(ServerListModel) {
    return await this.serverListRepository.update(ServerListModel.Id, ServerListModel);
  }

  async create(serverList): Promise<Server> {
    return await this.serverListRepository.save(serverList);
  }
}
