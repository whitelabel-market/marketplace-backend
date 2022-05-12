import { registerEnumType } from '@nestjs/graphql';

export enum SortDirection {
  // Specifies an ascending order for a given `orderBy` argument.
  asc = 'asc',
  // Specifies a descending order for a given `orderBy` argument.
  desc = 'desc',
}

registerEnumType(SortDirection, {
  name: 'SortDirection',
  description:
    'Possible directions in which to order a list of items when provided an `orderBy` argument.',
});
