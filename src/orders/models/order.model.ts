import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { Asset } from './asset.model';
import { OrderData } from './order-data.model';

@ObjectType()
export class Order extends BaseModel {
  @Field()
  maker: string;

  @Field({ nullable: true })
  taker?: string;

  @Field((type) => Asset)
  make: Asset;

  @Field((type) => Asset)
  take: Asset;

  @Field()
  salt: string;

  @Field()
  hash: string;

  @Field()
  start: Date;

  @Field()
  end: Date;

  @Field((type) => OrderData)
  orderData: OrderData;

  @Field({ nullable: true })
  signature?: string;
}
