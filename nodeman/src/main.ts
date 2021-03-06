import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { ApplicationModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
import { ServerModule } from './module/server.module';

import {configure, getLogger} from 'log4js';
var path = require('path');
var appDir = path.dirname(require.main.filename);
configure(appDir + '/config/log4js.json');
var logger = getLogger('main');

const config = require('config-lite')(__dirname);

function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('NodeMan open api')
    .setDescription('NodeMan Open API description')
    .setVersion('1.0')
    .addTag('servers')
    .build();
  const document = SwaggerModule.createDocument(app, options, { include: [ServerModule] });
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {

  var factory = ApplicationModule;

  var serverType = config.IsManager ? 'manager' : 'proxy';
  logger.info('Starting server as a ' + serverType);

  var port = config.IsManager ? config.ManagePort : (process.env.PORT || config.ProxyPort);
  if (config.IsManager && config.UseHttps) {
    const instance = express();
    var app = await NestFactory.create(factory, instance);
    //app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));

    setupSwagger(app);
    //app.useGlobalPipes(new ValidatorPipe());
    app.enableCors();
    app.useStaticAssets(__dirname + '/public');
    app.setBaseViewsDir(__dirname + '/views');
    app.setViewEngine('hbs');
    app.init();

    var https = require('https');
    var fs = require('fs');
    var path = require('path')
    var options = {
      key: fs.readFileSync(path.join(__dirname, 'certs', 'server', 'private.key')),
      cert: fs.readFileSync(path.join(__dirname, 'certs', 'server', 'public.crt'))
    };
    let httpsServer = https.createServer(options, instance);
    await httpsServer.listen(port);

    logger.info('HTTPS server listening on port ' + port);
  }
  else {
    const app = await NestFactory.create(factory);
    //app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));
    app.enableCors();

    if (config.IsManager) {
      setupSwagger(app);
      app.useStaticAssets(__dirname + '/public');
      app.setBaseViewsDir(__dirname + '/views');
      app.setViewEngine('hbs');
    }

    app.init();

    var port = config.IsManager ? config.ManagePort : (process.env.PORT || config.ProxyPort);
    logger.info('HTTP server listening on port ' + port);

    await app.listen(port);
  }
}
bootstrap()

