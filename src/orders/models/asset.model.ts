import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { AssetType } from './asset-type.model';
import { keccak256, solidityKeccak256, toUtf8Bytes } from 'ethers/lib/utils';

@ObjectType()
export class Asset extends BaseModel {
  @Field((type) => AssetType)
  type: AssetType;

  @Field()
  value: string;

  get hash() {
    return solidityKeccak256(
      ['bytes32', 'bytes32', 'uint256'],
      [Asset.TYPE_HASH, this.type.hash, this.value]
    );
  }

  static TYPE_HASH = keccak256(
    toUtf8Bytes(
      'Asset(AssetType assetType,uint256 value)AssetType(bytes4 assetClass,bytes data)'
    )
  );
}
