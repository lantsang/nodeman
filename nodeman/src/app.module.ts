import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './module/auth.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ServerController } from './controller/server.controller';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule],
})

export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(ServerController);
  }
}
