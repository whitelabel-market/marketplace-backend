import { PrismaService } from 'nestjs-prisma';
import {
  Resolver,
  Query,
  Parent,
  Args,
  ResolveField,
  Subscription,
  Mutation,
} from '@nestjs/graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/models/user.model';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { OrderIdArgs } from './args/order-id.args';
import { UserIdArgs } from './args/user-id.args';
import { Order } from './models/order.model';
import { OrderConnection } from './models/order-connection.model';
import { OrderSort } from './dto/order-sort.input';
import { CreateOrderInput } from './dto/createOrder.input';

const pubSub = new PubSub();

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private prisma: PrismaService) {}

  @Subscription(() => Order)
  orderCreated() {
    return pubSub.asyncIterator('orderCreated');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Order)
  async createOrder(
    @UserEntity() user: User,
    @Args('data') data: CreateOrderInput
  ) {
    const newOrder = this.prisma.order.create({
      data: {
        published: true,
        title: data.title,
        content: data.content,
        authorId: user.id,
      },
    });
    pubSub.publish('orderCreated', { orderCreated: newOrder });
    return newOrder;
  }

  @Query(() => OrderConnection)
  async publishedOrders(
    @Args() { after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({
      name: 'orderBy',
      type: () => OrderSort,
      nullable: true,
    })
    orderBy: OrderSort
  ) {
    const a = await findManyCursorConnection(
      (args) =>
        this.prisma.order.findMany({
          include: { author: true },
          where: {
            published: true,
            title: { contains: query || '' },
          },
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : null,
          ...args,
        }),
      () =>
        this.prisma.order.count({
          where: {
            published: true,
            title: { contains: query || '' },
          },
        }),
      { first, last, before, after }
    );
    return a;
  }

  @Query(() => [Order])
  userOrders(@Args() id: UserIdArgs) {
    return this.prisma.user
      .findUnique({ where: { id: id.userId } })
      .orders({ where: { published: true } });

    // or
    // return this.prisma.orders.findMany({
    //   where: {
    //     published: true,
    //     author: { id: id.userId }
    //   }
    // });
  }

  @Query(() => Order)
  async order(@Args() id: OrderIdArgs) {
    return this.prisma.order.findUnique({ where: { id: id.orderId } });
  }

  @ResolveField('author')
  async author(@Parent() order: Order) {
    return this.prisma.order.findUnique({ where: { id: order.id } }).author();
  }
}
