import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { configure, getLogger } from 'log4js';
var path = require('path');
var appDir = path.dirname(require.main.filename);
configure(appDir + '/config/log4js.json');
var logger = getLogger('main');

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { }

    async createToken(email: string, password: string): Promise<any> {
        // var user = await this.userService.findOne(email, password);
        var user = null;
        if (email === 'admin@restmesh.com' && password === '123qwe') {
            user = {
                Id: 1,
                Username: 'admin',
                Email: 'admin@restmesh.com',
                Password: '123qwe'
            }
        }
        if (user != null) {
            const user: JwtPayload = { email: 'admin@restmesh.com' };
            const expiresIn = 604800;
            const accessToken = jwt.sign(user, 'secretKey', { expiresIn });
            return {
                expiresIn,
                accessToken,
            };
        }
        else {
            logger.warn(`Cannot find user by email ${email}`);
            return false;
        }
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        logger.info(`Try to validate user by email ${payload.email}.`);
        return await this.userService.findOneByEmail(payload.email);
    }
}