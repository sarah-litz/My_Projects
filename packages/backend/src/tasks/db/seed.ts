import chalk from 'chalk';
// Must be at top
import 'reflect-metadata';
import { typeOrmConfig } from '../../config';
import { superCreateConnection } from '../../helper/create-connection';
import { User } from '../../models/User';
import bcrypt from 'bcryptjs';

(async () => {
  console.log('Beginning dbseed task.');

  console.log(
    chalk.blue(
      `Creating '${typeOrmConfig.database}' database if not already created.`
    )
  );
  const connection = await superCreateConnection();

  console.log('PG connected.');

  // Create seed data.
  let user = new User();
  user.email = 'john@doe.com';
  user.password = await bcrypt.hash('johndoe', 8);

  const userRepository = connection.getRepository(User);
  user = await userRepository.save(user); // re-assign to know assigned id
  console.log(`User saved. id = ${user.id}`);

  // Close connection
  await connection.close();
  console.log('PG connection closed.');

  console.log('Finished dbseed task.');
})();
