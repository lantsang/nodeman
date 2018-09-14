import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    resolve(...args: any[]): MiddlewareFunction {
        return (req, res, next) => {
            console.log(req.method, req.baseUrl, 'HTTP/' + req.httpVersion);
            for (var name in req.headers) {
                console.log(name + ':', req.headers[name]);
            }

            next();
        };
    }
}