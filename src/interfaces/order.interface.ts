import { ethers } from 'ethers';

export interface Order {
  maker: string;
  taker?: string;
  salt: string;
  hash: string;
}
