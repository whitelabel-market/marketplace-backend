import { IsString, ValidateNested } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CreateAssetTypeInput } from './createAssetType.input';

@InputType()
export class CreateAssetInput {
  @Field((type) => CreateAssetTypeInput)
  @ValidateNested()
  @Type(() => CreateAssetTypeInput)
  type: CreateAssetTypeInput;

  @Field()
  @IsString()
  value: string;
}
