import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, Column, CreateDateColumn, UpdateDateColumn, Unique, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { Order } from '@interfaces/order.interface';
import { AssetEntity } from '@entities/asset.entity';
import { OrderDataEntity } from '@entities/orderData.entity';

@Entity()
export class OrderEntity extends BaseEntity implements Order {
  @PrimaryColumn()
  hash: string;

  @Column()
  @IsNotEmpty()
  maker: string;

  @Column()
  taker: string;

  @OneToOne(() => AssetEntity)
  @JoinColumn()
  @IsNotEmpty()
  make: AssetEntity;

  @OneToOne(() => AssetEntity)
  @JoinColumn()
  @IsNotEmpty()
  take: AssetEntity;

  @Column()
  @IsNotEmpty()
  @Unique(['salt'])
  salt: string;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @OneToOne(() => OrderDataEntity)
  @JoinColumn()
  orderData: OrderDataEntity;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
