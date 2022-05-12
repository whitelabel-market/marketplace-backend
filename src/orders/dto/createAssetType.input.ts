import {
  IsBoolean,
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
import { AssetType } from '../models/asset-type.model';

@InputType()
export class CreateAssetTypeInput {
  @Field()
  @IsString()
  type: string;

  @Field()
  @IsString()
  data: string;

  @Field()
  @IsBoolean()
  nft: boolean;
}
