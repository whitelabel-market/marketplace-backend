import { Field, InputType } from 'type-graphql';
import { Asset } from '@typedefs/asset.type';
import { CreateAssetTypeDto } from '@dtos/assetType.dto';
import { ValidateNested } from 'class-validator';

@InputType()
export class CreateAssetDto implements DeepPartial<Asset> {
  @ValidateNested()
  @Field(type => CreateAssetTypeDto)
  type: CreateAssetTypeDto;

  @Field()
  value: string;
}
