import { IsArray, IsBoolean, IsString, ValidateNested } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CreateAssetTypeInput } from './createAssetType.input';
import { Part } from '../models/part.model';
import { CreatePartInput } from './createPart.input';

@InputType()
export class CreateOrderDataInput {
  @Field((type) => [CreatePartInput])
  @ValidateNested({ each: true })
  @Type(() => CreatePartInput)
  @IsArray()
  payouts: CreatePartInput[];

  @Field((type) => [CreatePartInput])
  @ValidateNested({ each: true })
  @Type(() => CreatePartInput)
  @IsArray()
  originFees: CreatePartInput[];

  @Field()
  @IsBoolean()
  isMakeFill: boolean;
}
