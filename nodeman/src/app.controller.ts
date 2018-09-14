import {
  Get,
  Controller,
  Render,
} from '@nestjs/common';
import { UserService } from './service/user.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @Render('login')
  root() {
    this.userService.ensureUserExist()
      .then(function (result) {
        return { message: 'ok' };
      })
      .catch(function (error) {
        console.warn(error);
        return { message: error };
      })
  }
}
