import { appSchema, tableSchema } from '@nozbe/watermelondb';

import NotificationSchema from './NotificationSchema';

export default appSchema({
  version: 1,
  tables: [NotificationSchema],
});
