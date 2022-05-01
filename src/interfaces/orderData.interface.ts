import { Part } from '@interfaces/part.interface';

export interface OrderData {
  payouts: Part[];
  originFees: Part[];
  isMakeFill: boolean;
}
