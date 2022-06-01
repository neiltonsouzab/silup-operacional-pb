import { Model } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';

export default class RoundMaterial extends Model {
  static table = 'rounds_materials';

  @field('product_id')
  productId!: number;

  @field('round_id')
  roundId!: number;

  @field('amount')
  amount!: number;

  @readonly @date('created_at') createdAt!: number;

  @readonly @date('updated_at') updatedAt!: number;
}
