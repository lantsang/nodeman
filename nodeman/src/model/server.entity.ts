import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Server extends BaseEntity {

  @ApiModelProperty()
  @PrimaryGeneratedColumn() Id: number;

  @ApiModelProperty()
  @Column({ length: 255, comment: '物理服务器IP地址' })
  PhysicalServerAddress: string;

  @ApiModelProperty()
  @Column({ length: 255, nullable: true, comment: '服务器名称' })
  NodeServerName: string;

  @ApiModelProperty()
  @Column({ type: 'int', comment: '进程ID', default: 0 })
  ProcessId: number;

  @ApiModelProperty()
  @Column({ type: 'int', comment: '端口号' })
  Port: number;

  @ApiModelProperty()
  @Column({ length: 255, comment: '服务类型http或者https' })
  Type: string;

  @ApiModelProperty()
  @Column({ length: 255, nullable: true, comment: '版本号' })
  Version: string;

  @ApiModelProperty()
  @Column({ length: 255, nullable: true, comment: 'git revision 号' })
  Revision: string;

  @ApiModelProperty()
  @Column({ type: 'int', comment: '代理服务器状态，0：正常，2：error，1：非200的error', default: 2 })
  ProxyStatus: number;

  @ApiModelProperty()
  @Column({ type: 'int', comment: '服务器状态，0：正常，2：error，1：非200的error', default: 2 })
  ServerStatus: number;

  @ApiModelProperty()
  @Column({ length: 255, comment: '启动时间' })
  StartTime: string;

  @ApiModelProperty()
  @Column({ comment: 'Git路径' })
  GitPath: string;

  @ApiModelProperty()
  @Column({ length: 255, nullable: true, comment: '状态' })
  Remark: string;

  @ApiModelProperty()
  @Column({ length: 255, nullable: true, comment: '消息' })
  Message: string;

  @ApiModelProperty()
  @Column({ length: 255, nullable: true, comment: '启动命令' })
  StartCommand: string;

  @ApiModelProperty()
  @Column({ length: 255, nullable: true, comment: '上传结果' })
  UploadResult: string;

  @ApiModelProperty()
  @Column({ length: 255, nullable: true, comment: '部署证书结果' })
  DeployResult: string;

  @ApiModelProperty()
  @Column({ length: 255, nullable: true, comment: '域名' })
  Domain: string;

  @ApiModelProperty()
  @Column({ type: 'int', comment: 'Screen session pid', default: 0 })
  Session: number;
}
