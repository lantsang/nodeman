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

@ApiUseTags('servers')
@UseFilters(new CustomExceptionFilter())
@UseGuards(AuthGuard('jwt'))
@Controller()
export class ServerController {
    constructor(private readonly serverService: ServerService) { }

    @Get('/server/list')
    getServerList(@Req() req, @Res() res) {
        this.serverService.findAll()
            .then(function (result) {
                res.send(result);
            }).catch(function (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
            })
    }
}