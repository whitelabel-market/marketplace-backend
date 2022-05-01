import { Field, ObjectType } from 'type-graphql';
import { Asset } from '@typedefs/asset.type';
import { OrderData } from '@typedefs/orderData.type';

@ObjectType()
export class Order {
  @Field()
  maker: string;

  @Field({ nullable: true })
  taker?: string;

  @Field(type => Asset)
  make: Asset;

  @Field(type => Asset)
  take: Asset;

  @Field()
  salt: string;

  @Field()
  hash: string;

  @Field()
  start: Date;

  @Field()
  end: Date;

  @Field(type => OrderData)
  orderData: OrderData;

  @Field({ nullable: true })
  signature?: string;
}
