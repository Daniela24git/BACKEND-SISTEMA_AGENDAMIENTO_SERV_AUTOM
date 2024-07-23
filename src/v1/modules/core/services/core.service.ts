import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InitAppDto } from '@v1/modules/core/dto';
import { User, UserRole } from '@v1/modules/users/entities';
import { MoreThan, Repository } from 'typeorm';
import { IServerResponseModel } from '@v1/shared/models';
import { SeverityMessage } from '@v1/shared/enum';
import { configuration } from '@v1/shared/config';
import { ConfigType } from '@nestjs/config';
import { RoleType, Status } from '@v1/modules/users/enum';
import { Appointment } from '@v1/modules/appointments/entities';
import { Product } from '@v1/modules/products/entities';
import { Vehicle } from '@v1/modules/vehicles/entities';
import { Permission } from '@v1/modules/permissions/entities';
import { Role } from '@v1/modules/roles/entities';
import { PermissionType } from '@v1/modules/permissions/enum';
import { EntityFromSystemType } from '@v1/modules/entity-from-system/enum';
import { EntityFromSystem } from '@v1/modules/entity-from-system/entities';
import { RolePermission } from '@v1/modules/users/entities/role-permissions.entity';

@Injectable()
export class CoreService {
  constructor(
    @Inject(configuration.KEY)
    private readonly configService: ConfigType<typeof configuration>,
    @Inject(User) private readonly userRepo: Repository<User>,
    @Inject(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
    @Inject(Product)
    private readonly productRepo: Repository<Product>,
    @Inject(Vehicle)
    private readonly vehicleRepo: Repository<Vehicle>,
    @Inject(Permission)
    private readonly permissionRepo: Repository<Permission>,
    @Inject(Role)
    private readonly roleRepo: Repository<Role>,
    @Inject(EntityFromSystem)
    private readonly entityFromSystemRepo: Repository<EntityFromSystem>,
    @Inject(RolePermission)
    private readonly rolePermissionsRepo: Repository<RolePermission>,
  ) {}

  async create(payload: InitAppDto): Promise<IServerResponseModel<User>> {
    // validando api key

    if (this.configService.app.apiKey != payload.apiKey) {
      throw new UnauthorizedException('Llave incorrecta');
    }

    // creando datos iniciales

    const permissions = [
      PermissionType.CREATE,
      PermissionType.READ,
      PermissionType.UPDATE,
      PermissionType.DELETE,
    ];
    for (const permission of permissions) {
      const p = new Permission();
      p.name = permission;
      p.active = true;
      await this.permissionRepo.save(p);
    }

    const roles = [
      RoleType.SUPER_ADMINISTRATOR,
      RoleType.MECHANIC,
      RoleType.CUSTOMER,
    ];
    for (const role of roles) {
      const r = new Role();
      r.name = role;
      r.active = true;
      await this.roleRepo.save(r);
    }

    const entitiesFromSystem = [
      EntityFromSystemType.APPOINTMENTS,
      EntityFromSystemType.AUTH,
      EntityFromSystemType.CORE,
      EntityFromSystemType.ENTITY_FROM_SYSTEM,
      EntityFromSystemType.PERMISSIONS,
      EntityFromSystemType.PRODUCTS,
      EntityFromSystemType.ROLES,
      EntityFromSystemType.USERS,
      EntityFromSystemType.VEHICLES,
    ];
    for (const entityFromSystem of entitiesFromSystem) {
      const r = new EntityFromSystem();
      r.name = entityFromSystem;
      r.active = true;
      await this.entityFromSystemRepo.save(r);
    }

    const allEntityFromSystem = await this.entityFromSystemRepo.find();
    const roleSuperAdmin = await this.roleRepo.findOneBy({
      name: RoleType.SUPER_ADMINISTRATOR,
    });
    const allPermissions = await this.permissionRepo.find();
    for (const entityFromSystem of allEntityFromSystem) {
      for (const permission of allPermissions) {
        const rolePermissions = new RolePermission();
        rolePermissions.permission_id = permission.id;
        rolePermissions.role_id = roleSuperAdmin.id;
        rolePermissions.entity_from_system_id = entityFromSystem.id;
        await this.rolePermissionsRepo.save(rolePermissions);
      }
    }

    // creando super usuario

    const userRole = new UserRole();
    userRole.role = roleSuperAdmin;

    const email = this.configService.superUser.super_user_email;
    let found = await this.userRepo.findOneBy({ email });
    if (!found) {
      const superUser = new User();
      superUser.email = email;
      superUser.password = this.configService.superUser.super_user_password;
      superUser.status = Status.ACTIVE;
      superUser.name = 'El super usuario';
      superUser.birth_date = new Date();
      superUser.address = 'ECUADOR';
      superUser.identification = '0000000000';
      superUser.phone = '00000000';
      userRole.user_id = superUser.id;
      superUser.roles = [userRole];
      found = await this.userRepo.save(superUser);
    }

    return {
      data: found,
      message: {
        summary: 'Aplicación iniciada',
        detail: 'User el super usuario para ingresar al sistema',
        severity: SeverityMessage.success,
      },
    };
  }

  async dataDashboard(): Promise<IServerResponseModel<any>> {
    const date = new Date();
    const usersCount = await this.userRepo.count();
    const usersNewCount = await this.userRepo.countBy({
      created_at: MoreThan(date),
    });
    const appointmentsCount = await this.appointmentRepo.count();
    const appointmentsNewCount = await this.appointmentRepo.countBy({
      created_at: MoreThan(date),
    });
    const productsCount = await this.productRepo.count();
    const productsNewCount = await this.productRepo.countBy({
      created_at: MoreThan(date),
    });
    const vehiclesCount = await this.vehicleRepo.count();
    const vehiclesNewCount = await this.vehicleRepo.countBy({
      created_at: MoreThan(date),
    });

    return {
      data: {
        user: {
          usersCount,
          usersNewCount,
        },
        appointment: {
          appointmentsCount,
          appointmentsNewCount,
        },
        product: {
          productsCount,
          productsNewCount,
        },
        vehicle: {
          vehiclesCount,
          vehiclesNewCount,
        },
      },
    };
  }
}
