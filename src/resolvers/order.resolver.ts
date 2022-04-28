import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { CreateOrderDto } from '@dtos/order.dto';
import OrderRepository from '@repositories/order.repository';
import { Order } from '@typedefs/order.type';

@Resolver()
export class orderResolver extends OrderRepository {
  @Query(() => [Order], {
    description: 'Order find list',
  })
  async getOrders(): Promise<Order[]> {
    const orders: Order[] = await this.orderFindAll();
    return orders;
  }

  @Query(() => Order, {
    description: 'Order find by id',
  })
  async getOrderByHash(@Arg('orderHash') orderHash: string): Promise<Order> {
    const order: Order = await this.orderFindByHash(orderHash);
    return order;
  }

  @Mutation(() => Order, {
    description: 'Order create',
  })
  async createOrder(@Arg('orderData') orderData: CreateOrderDto): Promise<Order> {
    const order: Order = await this.orderCreate(orderData);
    return order;
  }

  @Mutation(() => Order, {
    description: 'Order update',
  })
  async updateOrder(@Arg('orderHash') orderHash: string, @Arg('orderData') orderData: CreateOrderDto): Promise<Order> {
    const order: Order = await this.orderUpdate(orderHash, orderData);
    return order;
  }

  @Mutation(() => Order, {
    description: 'Order delete',
  })
  async deleteOrder(@Arg('orderHash') orderHash: string): Promise<Order> {
    const order: Order = await this.orderDelete(orderHash);
    return order;
  }
}
