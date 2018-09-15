import {
    Get,
    Controller,
    Req,
    Res,
    HttpStatus,
    UseFilters,
    UseGuards,
    HttpException,
} from '@nestjs/common';
import { ServerService } from '../service/server.service';
import { AuthGuard } from '@nestjs/passport';
import { CustomExceptionFilter } from '../filters/http-exception.filter';
import { ApiUseTags } from '@nestjs/swagger';
import {configure, getLogger} from 'log4js';
var path = require('path');
var appDir = path.dirname(require.main.filename);
configure(appDir + '/config/log4js.json');
var logger = getLogger('server');

@ApiUseTags('servers')
@UseFilters(new CustomExceptionFilter())
@UseGuards(AuthGuard('jwt'))
@Controller()
export class ServerController {
    constructor(private readonly serverService: ServerService) { }

    @Get('/server/list')
    getServerList(@Req() req, @Res() res) {
        logger.info('Try to get server list');
        this.serverService.findAll()
            .then(function (result) {
                res.send(result);
            }).catch(function (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
            })
    }
}