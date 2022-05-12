import { InputType, registerEnumType } from '@nestjs/graphql';
import { Sort } from 'src/common/sort/sort';

export enum OrderSortField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  published = 'published',
  title = 'title',
  content = 'content',
}

registerEnumType(OrderSortField, {
  name: 'OrderSortField',
  description: 'Properties by which order connections can be ordered.',
});

@InputType()
export class OrderSort extends Sort {
  field: OrderSortField;
}
