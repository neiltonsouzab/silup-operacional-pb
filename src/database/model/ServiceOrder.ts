import { Model } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';
import { parseISO, format } from 'date-fns';

export default class ServiceOrder extends Model {
  static table = 'services_orders';

  @field('original_id')
  originalId!: number;

  @field('ocurrence_type_description')
  ocurrenceTypeDescription!: string;

  @field('ocurrence_origin_descripton')
  ocurrenceOriginDescription!: string;

  @field('address')
  address!: string;

  @field('latitude')
  latitude!: number;

  @field('longitude')
  longitude!: number;

  @field('image_url')
  imageUrl!: string;

  @field('date')
  date!: string;

  @field('obs')
  obs!: string;

  @field('obs_os')
  obsOs!: string;

  @field('solution_id')
  solutionId!: number;

  // @field('member_id')
  // memberId!: number;

  @field('status_id')
  statusId!: 1 | 2 | 3 | 7 | 8 | 9 | 10;

  @field('sent')
  sent!: number;

  @field('protestant')
  protestant!: string;

  @field('protestant_phone')
  protestantPhone!: string;

  @field('image_name')
  imageName!: string;

  // @field('points_amount')
  // pointsAmount!: number;

  @readonly @date('created_at') createdAt!: number;

  @readonly @date('updated_at') updatedAt!: number;

  getFormattedDate(): string {
    return format(parseISO(this.date), 'dd/MM/yyyy HH:mm');
  }
}
