import { Model } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';

export default class Notification extends Model {
  static table = 'notifications';

  @field('obs')
  obs!: string;

  @field('latitude')
  latitude!: number;

  @field('longitude')
  longitude!: number;

  @field('image_name')
  imageName!: string;

  @field('notification_type_id')
  notificationTypeId!: number;

  @readonly @date('created_at') createdAt!: number;

  @readonly @date('updated_at') updatedAt!: number;
}
