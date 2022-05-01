import { Field, InputType } from 'type-graphql';
import { OrderData } from '@typedefs/orderData.type';
import { CreatePartDto } from '@dtos/part.dto';
import { ValidateNested } from 'class-validator';

@InputType()
export class CreateOrderDataDto implements DeepPartial<OrderData> {
  @ValidateNested()
  @Field(type => [CreatePartDto])
  payouts: CreatePartDto[];

  @ValidateNested()
  @Field(type => [CreatePartDto])
  originFees: CreatePartDto[];

  @Field()
  isMakeFill: boolean;
}
