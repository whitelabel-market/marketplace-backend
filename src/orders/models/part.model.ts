import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class Part extends BaseModel {
  @Field()
  account: string;

  @Field()
  value: string;

  get hash() {
    // return solidityKeccak256(
    //   ['bytes32', 'address', 'uint256'],
    //   [Part.TYPE_HASH, this.account, this.value]
    // );
    return 'hash';
  }

  toEthereum() {
    // return [this.account, this.value];
    return 'encoded';
  }

  // static TYPE_HASH = keccak256('Part(address account,uint256 value)');
}
