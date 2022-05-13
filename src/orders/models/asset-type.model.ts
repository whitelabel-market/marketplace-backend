import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { keccak256, solidityKeccak256, toUtf8Bytes } from 'ethers/lib/utils';

@ObjectType()
export class AssetType extends BaseModel {
  @Field()
  type: string;

  @Field()
  data: string;

  @Field()
  nft: boolean;

  get hash() {
    return solidityKeccak256(
      ['bytes32', 'bytes4', 'bytes'],
      [AssetType.TYPE_HASH, this.type, this.data]
    );
  }

  static TYPE_HASH = keccak256(
    toUtf8Bytes('AssetType(bytes4 assetClass,bytes data)')
  );
}
