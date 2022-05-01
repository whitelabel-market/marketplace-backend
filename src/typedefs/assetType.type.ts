import { Field, ObjectType } from 'type-graphql';
import { keccak256, solidityKeccak256 } from 'ethers/lib/utils';

const id = str => `0x${keccak256(str).substring(0, 8)}`;

const AssetTypes = {
  ETH: id('ETH'),
  ERC20: id('ERC20'),
  ERC721: id('ERC721'),
  ERC721_LAZY: id('ERC721_LAZY'),
  ERC1155: id('ERC1155'),
  ERC1155_LAZY: id('ERC1155_LAZY'),
  CRYPTO_PUNKS: id('CRYPTO_PUNKS'),
  GEN_ART: id('GEN_ART'),
  COLLECTION: id('COLLECTION'),
};

@ObjectType()
export class AssetType {
  @Field()
  type: string;

  @Field()
  data: string;

  @Field()
  nft: boolean;

  get hash() {
    return solidityKeccak256(['bytes32', 'bytes4', 'bytes'], [AssetType.TYPE_HASH, this.type, this.data]);
  }

  static TYPE_HASH = keccak256('AssetType(bytes4 assetClass,bytes data)');
}
