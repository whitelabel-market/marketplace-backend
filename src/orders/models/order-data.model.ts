import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { Part } from './part.model';

@ObjectType()
export class OrderData extends BaseModel {
  @Field((type) => [Part])
  payouts: Part[];

  @Field((type) => [Part])
  originFees: Part[];

  @Field()
  isMakeFill: boolean;

  toEthereum() {
    // return defaultAbiCoder.encode(
    //   ['address[]', 'address[]', 'uint8'],
    //   [
    //     this.payouts.map((p) => p.toEthereum()),
    //     this.originFees.map((f) => f.toEthereum()),
    //     this.isMakeFill ? 1 : 0,
    //   ]
    // );
    return 'encoded';
  }
}
