import { Module } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AuthController } from '../auth/auth.controller';
import { ServerModule } from './server.module';
import { UserModule } from './user.module';

@Module({
  imports: [ServerModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }