import { Model } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';

export default class Ocurrence extends Model {
  static table = 'ocurrences';

  @field('address')
  address!: string;

  @field('district')
  district!: string;

  @field('city')
  city!: string;

  @field('latitude')
  latitude!: number;

  @field('longitude')
  longitude!: number;

  @field('obs')
  obs!: string;

  @field('image_name')
  imageName!: string;

  @field('ocurrence_type_id')
  ocurrenceTypeId!: number;

  @field('point_id')
  pointId!: number;

  @field('point_tag')
  pointTag!: string;

  @readonly @date('created_at') createdAt!: number;

  @readonly @date('updated_at') updatedAt!: number;
}
