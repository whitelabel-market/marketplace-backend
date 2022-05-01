import { Field, ObjectType } from 'type-graphql';
import { defaultAbiCoder, keccak256, solidityKeccak256 } from 'ethers/lib/utils';
import { AssetType } from '@typedefs/assetType.type';
import { Part } from '@typedefs/part.type';

@ObjectType()
export class OrderData {
  @Field(type => [Part])
  payouts: Part[];

  @Field(type => [Part])
  originFees: Part[];

  @Field()
  isMakeFill: boolean;

  toEthereum() {
    return defaultAbiCoder.encode(
      ['address[]', 'address[]', 'uint8'],
      [this.payouts.map(p => p.toEthereum()), this.originFees.map(f => f.toEthereum()), this.isMakeFill ? 1 : 0],
    );
  }
}
