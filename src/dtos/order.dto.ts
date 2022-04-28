import { IsString } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import { Order } from '@typedefs/order.type';

@InputType()
export class CreateOrderDto implements Partial<Order> {
  @Field()
  @IsString()
  maker: string;

  @Field({ nullable: true })
  @IsString()
  taker?: string;

  @Field()
  salt: string;
}

@InputType()
export class UpdateOrderDto implements Partial<Order> {
  @Field({ nullable: true })
  @IsString()
  taker?: string;
}
