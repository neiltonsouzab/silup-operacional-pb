import { Model } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';

export default class Mapping extends Model {
  static table = 'mappings';

  @field('route_id')
  routeId!: number;

  @field('latitude')
  latitude!: number;

  @field('longitude')
  longitude!: number;

  @readonly @date('created_at') createdAt!: number;

  @readonly @date('updated_at') updatedAt!: number;
}
