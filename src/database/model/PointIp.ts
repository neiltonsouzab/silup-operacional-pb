import { Model } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';

export default class PointIp extends Model {
  static table = 'points_ips';

  @field('tag')
  tag!: string;

  @field('light_fixture_amount')
  lightFixtureAmount!: number;

  @field('obs')
  obs!: string;

  @field('latitude')
  latitude!: number;

  @field('longitude')
  longitude!: number;

  @field('image_name')
  imageName!: string;

  @field('post_type_id')
  postTypeId!: number;

  @field('reactor_type_id')
  reactorTypeId!: number;

  @field('reactor_power_id')
  reactorPowerId!: number;

  @field('arm_type_id')
  armTypeId!: number;

  @field('light_fixture_type_id')
  lightFixtureTypeId!: number;

  @field('lamp_type_id')
  lampTypeId!: number;

  @field('lamp_power_id')
  lampPowerId!: number;

  @field('perimeter_type_id')
  perimeterTypeId!: number;

  @field('place_type_id')
  placeTypeId!: number;

  @readonly @date('created_at') createdAt!: number;

  @readonly @date('updated_at') updatedAt!: number;
}
