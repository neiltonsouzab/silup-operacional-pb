import { Model } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';

export default class RoundNotification extends Model {
  static table = 'rounds_notifications';

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

  @field('notification_type_id')
  notificationTypeId!: number;

  @field('notification_status_id')
  notificationStatusId!: number;

  @field('member_id')
  memberId!: number;

  @field('solution_id')
  solutionId!: number;

  @field('point_id')
  pointId!: number;

  @field('point_tag')
  pointTag!: string;

  @readonly @date('created_at') createdAt!: number;

  @readonly @date('updated_at') updatedAt!: number;
}
