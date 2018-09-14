import { Controller, Get, UseGuards, Post, Req, Res, HttpStatus, Render } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async createToken(@Req() req, @Res() res): Promise<any> {
    console.log('login request is coming...');
    let email = req.body.Email;
    let password = req.body.Password;

    let token = await this.authService.createToken(email, password);
    console.log('token is ' + JSON.stringify(token));
    if (token) {
      res.send({ accessToken: token.accessToken, expiresIn: token.expiresIn })
    }
    else {
      return res.status(HttpStatus.UNAUTHORIZED).json();
    }
  }

  @Render('node')
  @Get('index')
  async index() {
  }
}
