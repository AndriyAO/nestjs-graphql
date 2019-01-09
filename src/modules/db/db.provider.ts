import { createConnection } from 'typeorm';

import { User } from '../user/user.entity';

export const dbProvider = {
  provide: 'DbConnectionToken',
  useFactory: async () =>
    await createConnection(),
};
