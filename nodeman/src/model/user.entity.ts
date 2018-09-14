import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn() Id: number;

    @Column({ length: 255, comment: '用户名' })
    Username: string;

    @Column({ length: 255, comment: '邮箱地址' })
    Email: string;

    @Column({ length: 255, comment: '密码' })
    Password: string;
}
