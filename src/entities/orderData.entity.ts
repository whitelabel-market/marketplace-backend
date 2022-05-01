import { PartEntity } from '@entities/part.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class OrderDataEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => PartEntity, part => part.id)
  payouts: PartEntity[];

  @OneToMany(() => PartEntity, part => part.id)
  originFees: PartEntity[];

  @Column()
  isMakeFill: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
