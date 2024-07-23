import { seeder } from 'nestjs-seeder';
import { AppModule } from '../../../app.module';
import { AppointmentsSeeder } from '@v1/modules/appointments/seeders';
// import { PermissionsSeeder } from '@v1/modules/permissions/seeders';
import { ProductsSeeder } from '@v1/modules/products/seeders';
// import { RolesSeeder } from '@v1/modules/roles/seeders';
import { UsersSeeder } from '@v1/modules/users/seeders';
import { VehiclesSeeder } from '@v1/modules/vehicles/seeders';

seeder({
  imports: [AppModule],
}).run([
  AppointmentsSeeder,
  // PermissionsSeeder,
  ProductsSeeder,
  // RolesSeeder,products
  UsersSeeder,
  VehiclesSeeder,
]);
