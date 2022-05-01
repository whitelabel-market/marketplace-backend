import { Module } from '@nestjs/common';
import { OrdersResolver } from './orders.resolver';

@Module({
  imports: [],
  providers: [OrdersResolver],
})
export class OrdersModule {}
