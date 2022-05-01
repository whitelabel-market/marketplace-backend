import { InputType, registerEnumType } from '@nestjs/graphql';
import { Sort } from 'src/common/sort/sort';

export enum PostSortField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  published = 'published',
  title = 'title',
  content = 'content',
}

registerEnumType(PostSortField, {
  name: 'PostSortField',
  description: 'Properties by which post connections can be ordered.',
});

@InputType()
export class PostSort extends Sort {
  field: PostSortField;
}
