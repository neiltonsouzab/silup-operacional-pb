import { Model } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';

export default class ArmType extends Model {
  static table = 'arms_types';

  @field('original_id')
  originalId!: number;

  @field('name')
  name!: string;

  @readonly @date('created_at') createdAt!: number;

  @readonly @date('updated_at') updatedAt!: number;
}
