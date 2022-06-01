import { tableSchema } from '@nozbe/watermelondb';

export default tableSchema({
  name: 'notifications',
  columns: [
    { name: 'obs', type: 'string' },
    { name: 'latitude', type: 'number' },
    { name: 'longitude', type: 'number' },
    { name: 'image_name', type: 'string' },
    { name: 'notification_type_id', type: 'number' },
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' },
  ],
});
