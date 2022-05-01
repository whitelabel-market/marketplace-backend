import { Field, InputType } from 'type-graphql';
import { Part } from '@typedefs/part.type';

@InputType()
export class CreatePartDto implements Partial<Part> {
  @Field()
  account: string;

  @Field()
  value: string;
}
