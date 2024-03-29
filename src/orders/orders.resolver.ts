import { PrismaService } from 'nestjs-prisma';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PubSub } from 'graphql-subscriptions';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/models/user.model';
import { OrderIdArgs } from './args/order-id.args';
import { Order } from './models/order.model';
import { OrderConnection } from './models/order-connection.model';
import { OrderSort } from './dto/order-sort.input';
import { CreateOrderInput } from './dto/createOrder.input';

const include = {
  make: { include: { type: true } },
  take: { include: { type: true } },
  orderData: { include: { payouts: true, originFees: true } },
};

const pubSub = new PubSub();

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private prisma: PrismaService) {}

  @Subscription(() => Order)
  orderCreated() {
    return pubSub.asyncIterator('orderCreated');
  }

  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Order)
  async createOrder(
    @UserEntity() user: User,
    @Args('data') data: CreateOrderInput
  ) {
    const newOrder = this.prisma.order.create({
      data: {
        maker: data.maker,
        taker: data.taker,
        make: {
          create: {
            value: data.make.value,
            type: {
              create: {
                type: data.make.type.type,
                nft: data.make.type.nft,
                data: data.make.type.data,
              },
            },
          },
        },
        take: {
          create: {
            value: data.take.value,
            type: {
              create: {
                type: data.take.type.type,
                nft: data.take.type.nft,
                data: data.take.type.data,
              },
            },
          },
        },
        salt: data.salt,
        hash: data.hash,
        start: data.start,
        end: data.end,
        orderData: {
          create: {
            payouts: {
              createMany: {
                data: data.orderData.payouts.map((part) => ({
                  account: part.account,
                  value: part.value,
                  originFeesOrderDataId: data.orderData.id,
                })),
              },
            },
            originFees: {
              createMany: {
                data: data.orderData.originFees.map((part) => ({
                  account: part.account,
                  value: part.value,
                  payoutsOrderDataId: data.orderData.id,
                })),
              },
            },
            isMakeFill: data.orderData.isMakeFill,
          },
        },
        signature: data.signature,
      },
      include: {
        make: {
          include: {
            type: true,
          },
        },
        take: {
          include: {
            type: true,
          },
        },
        orderData: {
          include: {
            originFees: true,
            payouts: true,
          },
        },
      },
    });
    await pubSub.publish('orderCreated', { orderCreated: newOrder });
    return newOrder;
  }

  @Query(() => OrderConnection)
  orders(
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
    return findManyCursorConnection(
      (args) =>
        this.prisma.order.findMany({
          include,
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : null,
          ...args,
        }),
      () => this.prisma.order.count(),
      { first, last, before, after }
    );
  }

  @Query(() => Order)
  async order(@Args() args: OrderIdArgs) {
    return this.prisma.order.findUnique({
      include,
      where: { id: args.orderId },
    });
  }
}
