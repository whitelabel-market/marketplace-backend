import { Asset } from '@interfaces/asset.interface';
import { OrderData } from '@interfaces/orderData.interface';

export interface Order {
  maker: string;
  taker?: string;
  make: Asset;
  take: Asset;
  salt: string;
  hash: string;
  start: Date;
  end: Date;
  orderData: OrderData;
  signature?: string;
}
