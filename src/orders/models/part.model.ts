import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { keccak256, solidityKeccak256, toUtf8Bytes } from 'ethers/lib/utils';

@ObjectType()
export class Part extends BaseModel {
  @Field()
  account: string;

  @Field()
  value: string;

  get hash() {
    return solidityKeccak256(
      ['bytes32', 'address', 'uint256'],
      [Part.TYPE_HASH, this.account, this.value]
    );
  }

  toEthereum() {
    return [this.account, this.value];
  }

  static TYPE_HASH = keccak256(
    toUtf8Bytes('Part(address account,uint256 value)')
  );
}
