# NodeMan

**NodeMan**是一款构建于NestJs框架的用于管理Ubuntu服务器上运行着的Node server的应用。特点概述：
 
- **使用简单** ：只需要在管理端页面输入一个IP地址，就可以管理你的Node server；
- **配置便捷** ：使用者需要额外输入Node server的启动命令，如果愿意的话也可以给自己的Node server起个名字；
- **高级功能** ：一切配置妥当后，就可以通过NodeMan来管理你的Node server了，如果还想自动处理服务器证书问题，可以继续配置域名等相关设置。

-------------------

## NodeMan简介

> NodeMan构建于NestJs框架，NestJs是一个高级的用于构建高效、可靠和可伸缩的服务端应用的NodeJs框架。    —— [NestJs](https://nestjs.com)

为了便于管理，我们在逻辑上对控制端和代理端进行了区分，当NodeMan启动时，会自动根据当前配置来决定加载哪些Module，具体代码如下： 

### 代码块
``` javascript
async function bootstrap() {
  var factory = config.IsManager ? ApplicationModule : ProxyModule;
  var serverType = config.IsManager ? 'manager' : 'proxy';
  console.info('Starting server as a ' + serverType);

  var port = config.IsManager ? config.ManagePort : config.ProxyPort;
  if (config.IsManager && config.UseHttps) {
    const instance = express();
    var app = await NestFactory.create(factory, instance);
    //app.useGlobalPipes(new ValidatorPipe());
    app.enableCors();
    app.useStaticAssets(__dirname + '/public');
    app.setBaseViewsDir(__dirname + '/views');
    app.setViewEngine('hbs');
    app.init();
```

### 流程图
![](https://github.com/lantsang/nodeman/blob/master/Node%20server%20management%20structure.jpg?raw=true)

> **提示：**想了解更多，请查看代码。

### 功能列表

我们将逐步添加的主要功能列表如下：

- [ ] 基本框架搭建
- [ ] 添加认证机制
- [ ] 支持日志功能
- [ ] 监测Node server状态
- [ ] 支持Node server一键部署
- [ ] 支持Node server 证书文件的生成
- [ ] 支持Node server 证书文件的部署


## 反馈与建议
- 邮箱：<guofoo@163.com>

---------
感谢阅读这份帮助文档。请关注我们并给与我们反馈。
