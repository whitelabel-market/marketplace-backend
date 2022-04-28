import { Field, ObjectType } from 'type-graphql';
import { ethers } from 'ethers';

@ObjectType()
export class Order {
  @Field()
  maker: string;

  @Field({ nullable: true })
  taker?: string;

  @Field()
  salt: string;

  @Field()
  hash: string;
}
