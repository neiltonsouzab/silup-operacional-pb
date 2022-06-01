import { Model } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';

export default class RequisitionCompletedItem extends Model {
  static table = 'requisitions_completed_items';

  @field('requisition_completed_id')
  requisitionCompletedId!: number;

  @field('product_id')
  productId!: number;

  @field('product_name')
  productName!: string;

  @field('original_quantity')
  originalQuantity!: number;

  @field('route_quantity')
  routeQuantity!: number;

  @field('quantity')
  quantity!: number;

  @readonly @date('created_at') createdAt!: number;

  @readonly @date('updated_at') updatedAt!: number;
}
