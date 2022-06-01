import { tableSchema } from '@nozbe/watermelondb';

export default tableSchema({
  name: 'ocurrences_types',
  columns: [
    { name: 'original_id', type: 'number' },
    { name: 'name', type: 'string' },
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' },
  ],
});
