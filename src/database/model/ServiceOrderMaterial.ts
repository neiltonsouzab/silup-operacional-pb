import { Model } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';

export default class ServiceOrderMaterial extends Model {
  static table = 'services_orders_materials';

  @field('route_id')
  routeId!: number;

  @field('obs')
  obs!: string;

  @field('service_order_id')
  serviceOrderId!: number;

  @field('product_name')
  productName!: string;

  @field('product_id')
  productId!: number;

  @field('amount')
  amount!: number;

  @readonly @date('created_at') createdAt!: number;

  @readonly @date('updated_at') updatedAt!: number;
}
