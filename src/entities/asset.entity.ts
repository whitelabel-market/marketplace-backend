import { AssetTypeEntity } from '@entities/assetType.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Asset } from '@interfaces/asset.interface';

@Entity()
export class AssetEntity extends BaseEntity implements Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => AssetTypeEntity)
  @JoinColumn()
  type: AssetTypeEntity;

  @Column()
  value: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
