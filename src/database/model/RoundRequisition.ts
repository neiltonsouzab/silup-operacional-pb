import { Model } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';

export default class RoundRequisition extends Model {
  static table = 'rounds_requisitions';

  @field('original_id')
  originalId!: number;

  @field('requisition_id')
  requisitionId!: number;

  @field('product_id')
  productId!: number;

  @field('product_name')
  productName!: string;

  @field('requisition_amount')
  requisitionAmount!: number;

  @field('round_amount')
  roundAmount!: number;

  @readonly @date('created_at') createdAt!: number;

  @readonly @date('updated_at') updatedAt!: number;
}
