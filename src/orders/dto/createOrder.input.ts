import {
  IsDate,
  IsEthereumAddress,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MinDate,
  ValidateNested,
} from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { Asset } from '../models/asset.model';
import { OrderData } from '../models/order-data.model';
import { Type } from 'class-transformer';
import { CreateAssetInput } from './createAsset.input';
import { CreateOrderDataInput } from './createOrderData.input';
import { CreateAssetTypeInput } from './createAssetType.input';

@InputType()
export class CreateOrderInput {
  @Field()
  @IsEthereumAddress()
  maker: string;

  @Field({ nullable: true })
  @IsEthereumAddress()
  taker?: string;

  @Field((type) => CreateAssetInput)
  @ValidateNested()
  @Type(() => CreateAssetInput)
  make: CreateAssetInput;

  @Field((type) => CreateAssetInput)
  @ValidateNested()
  @Type(() => CreateAssetInput)
  take: CreateAssetInput;

  @Field()
  @IsNumberString()
  salt: string;

  @Field()
  @IsString()
  // @IsHash(algorithm: string)
  hash: string;

  @Field({ nullable: true })
  @IsDate()
  // @MinDate(0)
  start?: Date;

  @Field({ nullable: true })
  @IsDate()
  // @MinDate(0)
  end?: Date;

  @Field((type) => CreateOrderDataInput)
  @ValidateNested()
  @Type(() => CreateOrderDataInput)
  orderData: OrderData;

  @Field({ nullable: true })
  @IsString()
  // @IsHash(algorithm: string)
  signature?: string;
}
