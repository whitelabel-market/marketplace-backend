import { Field, InputType } from '@nestjs/graphql';
import { SortDirection } from './sort-direction';

@InputType({ isAbstract: true })
export abstract class Sort {
  @Field(() => SortDirection)
  direction: SortDirection;
}
