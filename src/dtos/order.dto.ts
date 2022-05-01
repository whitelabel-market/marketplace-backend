import { IsString } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import { Order } from '@typedefs/order.type';
import { CreateAssetDto } from '@dtos/asset.dto';
import { CreateOrderDataDto } from '@dtos/orderData.dto';

@InputType()
export class CreateOrderDto implements DeepPartial<Order> {
  @Field()
  maker: string;

  @Field({ nullable: true })
  @IsString()
  taker?: string;

  @Field(type => CreateAssetDto)
  make: CreateAssetDto;

  @Field(type => CreateAssetDto)
  take: CreateAssetDto;

  @Field()
  @IsString()
  salt: string;

  @Field()
  end: Date;

  @Field(type => CreateOrderDataDto)
  orderData: CreateOrderDataDto;

  @Field({ nullable: true })
  @IsString()
  signature?: string;
}

@InputType()
export class UpdateOrderDto implements Partial<Order> {
  @Field({ nullable: true })
  @IsString()
  taker?: string;
}
