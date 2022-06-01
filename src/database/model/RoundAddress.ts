import { Model } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';

export default class RoundAddress extends Model {
  static table = 'rounds_addresses';

  @field('original_id')
  originalId!: number;

  @field('round_id')
  roundId!: number;

  @field('status_id')
  statusId!: number;

  @field('address')
  address!: string;

  @readonly @date('created_at') createdAt!: number;

  @readonly @date('updated_at') updatedAt!: number;
}
