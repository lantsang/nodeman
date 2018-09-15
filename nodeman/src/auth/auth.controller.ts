import { Controller, Get, UseGuards, Post, Req, Res, HttpStatus, Render } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {configure, getLogger} from 'log4js';
var path = require('path');
var appDir = path.dirname(require.main.filename);
configure(appDir + '/config/log4js.json');
var logger = getLogger('auth');

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async createToken(@Req() req, @Res() res): Promise<any> {
    logger.info('login request is coming...');
    let email = req.body.Email;
    let password = req.body.Password;

    let token = await this.authService.createToken(email, password);
    if (token) {
      logger.info('login request is completed');
      res.send({ accessToken: token.accessToken, expiresIn: token.expiresIn })
    }
    else {
      logger.info('login request is failed');
      return res.status(HttpStatus.UNAUTHORIZED).json();
    }
  }

  @Render('node')
  @Get('index')
  async index() {
  }
}
