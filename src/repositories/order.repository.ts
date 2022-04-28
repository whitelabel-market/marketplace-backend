import { EntityRepository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '@dtos/order.dto';
import { OrderEntity } from '@entities/order.entity';
import { HttpException } from '@exceptions/HttpException';
import { Order } from '@interfaces/order.interface';
import { isEmpty } from '@utils/util';
import { defaultAbiCoder, keccak256 } from 'ethers/lib/utils';

const hashOrder = ({ maker, taker, salt }: CreateOrderDto) => {
  return keccak256(defaultAbiCoder.encode(['address', 'address', 'uint256'], [maker, taker, salt]));
};

@EntityRepository()
export default class OrderRepository {
  public async orderFindAll(): Promise<Order[]> {
    const orders: Order[] = await OrderEntity.find();

    return orders;
  }

  public async orderFindByHash(orderHash: string): Promise<Order> {
    if (isEmpty(orderHash)) throw new HttpException(400, 'OrderHash is missing');

    const order: Order = await OrderEntity.findOne({ where: { hash: orderHash } });
    if (!order) throw new HttpException(409, 'Order not found');

    return order;
  }

  public async orderCreate(orderData: CreateOrderDto): Promise<Order> {
    if (isEmpty(orderData)) throw new HttpException(400, 'OrderData is missing');
    const orderHash = hashOrder(orderData);
    const createOrderData: Order = await OrderEntity.create({ ...orderData, hash: orderHash }).save();

    return createOrderData;
  }

  public async orderUpdate(orderHash: string, orderData: UpdateOrderDto): Promise<Order> {
    if (isEmpty(orderHash)) throw new HttpException(400, 'OrderHash is missing');

    const findOrder: Order = await OrderEntity.findOne({ where: { hash: orderHash } });
    if (!findOrder) throw new HttpException(409, 'Order not found');

    await OrderEntity.update(orderHash, { ...orderData });

    const updateOrder: Order = await OrderEntity.findOne({ where: { hash: orderHash } });
    return updateOrder;
  }

  public async orderDelete(orderHash: string): Promise<Order> {
    if (isEmpty(orderHash)) throw new HttpException(400, 'OrderHash is missing');

    const findOrder: Order = await OrderEntity.findOne({ where: { hash: orderHash } });
    if (!findOrder) throw new HttpException(409, "You're not order");

    await OrderEntity.delete({ hash: orderHash });
    return findOrder;
  }
}
