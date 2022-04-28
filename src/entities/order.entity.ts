import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, Column, CreateDateColumn, UpdateDateColumn, Unique, PrimaryColumn } from 'typeorm';
import { Order } from '@interfaces/order.interface';
import { ethers } from 'ethers';

@Entity()
export class OrderEntity extends BaseEntity implements Order {
  @PrimaryColumn()
  hash: string;

  @Column()
  @IsNotEmpty()
  maker: string;

  @Column()
  taker: string;

  @Column()
  @IsNotEmpty()
  @Unique(['salt'])
  salt: string; // ethers.BigNumber

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
