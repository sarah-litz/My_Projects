// Must be at top

import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { typeOrmConfig } from '../../config';
import { User } from '../../models/User';
import bcrypt from 'bcryptjs';

(async () => {
  console.log('Beginning dbseed task.');

  const conn = await createConnection(typeOrmConfig);
  console.log('PG connected.');

  // Create seed data.
  let user = new User();
  user.email = 'john@doe.com';
  user.password = await bcrypt.hash('johndoe', 8);

  const userRepo = conn.getRepository(User);
  user = await userRepo.save(user); // re-assign to know assigned id
  console.log(`User saved. id = ${user.id}`);

  // Close connection
  await conn.close();
  console.log('PG connection closed.');

  console.log('Finished dbseed task.');
})();
