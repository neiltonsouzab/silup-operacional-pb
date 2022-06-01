import { Model } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';

export default class Route extends Model {
  static table = 'rounds';

  @field('original_id')
  originalId!: number;

  @field('status_description')
  statusDescription!: string;

  @field('team_name')
  teamName!: string;

  @field('obs')
  obs!: string;

  @field('vehicle_name')
  vehicleName!: string;

  @readonly @date('created_at') createdAt!: number;

  @readonly @date('updated_at') updatedAt!: number;
}
