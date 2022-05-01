import { Field, ObjectType } from 'type-graphql';
import { keccak256, solidityKeccak256 } from 'ethers/lib/utils';

@ObjectType()
export class Part {
  @Field()
  account: string;

  @Field()
  value: string;

  get hash() {
    return solidityKeccak256(['bytes32', 'address', 'uint256'], [Part.TYPE_HASH, this.account, this.value]);
  }

  toEthereum() {
    return [this.account, this.value];
  }

  static TYPE_HASH = keccak256('Part(address account,uint256 value)');
}
