import { Model } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';

export default class RequisitionCompleted extends Model {
  static table = 'requisitions_completed';

  @field('original_id')
  originalId!: number;

  @field('route_id')
  routeId!: number;

  @field('open_date')
  openDate!: Date;

  @field('closed_date')
  closedDate!: Date;

  @readonly @date('created_at') createdAt!: number;

  @readonly @date('updated_at') updatedAt!: number;
}
