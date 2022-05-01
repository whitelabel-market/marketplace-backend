import { Field, ObjectType } from 'type-graphql';
import { keccak256, solidityKeccak256 } from 'ethers/lib/utils';
import { AssetType } from '@typedefs/assetType.type';

@ObjectType()
export class Asset {
  @Field(type => AssetType)
  type: AssetType;

  @Field()
  value: string;

  get hash() {
    return solidityKeccak256(['bytes32', 'bytes32', 'uint256'], [Asset.TYPE_HASH, this.type.hash, this.value]);
  }

  static TYPE_HASH = keccak256('Asset(AssetType assetType,uint256 value)AssetType(bytes4 assetClass,bytes data)');
}
