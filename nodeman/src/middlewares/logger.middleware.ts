import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import { configure, getLogger } from 'log4js';
var path = require('path');
var appDir = path.dirname(require.main.filename);
configure(appDir + '/config/log4js.json');
var logger = getLogger('logger');

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    resolve(...args: any[]): MiddlewareFunction {
        return (req, res, next) => {
            logger.debug(req.method, req.baseUrl, 'HTTP/' + req.httpVersion);
            for (var name in req.headers) {
                logger.debug(name + ':', req.headers[name]);
            }

            next();
        };
    }
}