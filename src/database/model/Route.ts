import { Model } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';

export default class Route extends Model {
  static table = 'routes';

  @field('original_id')
  originalId!: number;

  @field('team_name')
  teamName!: string;

  @field('obs')
  obs!: string;

  @field('date')
  date!: string;

  @field('status_description')
  statusDescription!: boolean;

  @readonly @date('created_at') createdAt!: number;

  @readonly @date('updated_at') updatedAt!: number;
}
