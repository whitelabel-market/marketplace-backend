import { Field, InputType } from 'type-graphql';
import { AssetType } from '@typedefs/assetType.type';

@InputType()
export class CreateAssetTypeDto implements Partial<AssetType> {
  @Field()
  type: string;

  @Field()
  data: string;

  @Field()
  nft: boolean;
}
