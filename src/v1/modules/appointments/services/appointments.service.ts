import { Inject, Injectable } from '@nestjs/common';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from '@v1/modules/appointments/dto';
import { Appointment } from '@v1/modules/appointments/entities';
import { Repository } from 'typeorm';
import { IServerResponseModel } from '@v1/shared/models';
import { SeverityMessage } from '@v1/shared/enum';
import { FilterAppointmentDto } from '@v1/modules/appointments/dto/filter-appointment.dto';
import { PaginationDto } from '@v1/shared/dto';
import {
  Vehicle,
  VehicleProductsProductEntity,
} from '@v1/modules/vehicles/entities';
import { CreateVehicleDto } from '@v1/modules/vehicles/dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @Inject(Appointment)
    private readonly appointmentRepos: Repository<Appointment>,
    @Inject(Vehicle) private readonly vehicleRepos: Repository<Vehicle>,
    @Inject(VehicleProductsProductEntity)
    private readonly productRepos: Repository<VehicleProductsProductEntity>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    for (const appointmentVehicle of createAppointmentDto.appointmentVehicle) {
      if (appointmentVehicle?.vehicle) {
        const vehicle = new Vehicle(appointmentVehicle?.vehicle);
        await this.vehicleRepos.save(vehicle);
        appointmentVehicle.vehicle_id = vehicle.id;
        appointmentVehicle.vehicle = new CreateVehicleDto(vehicle);
      }

      for (const vehicleProduct of appointmentVehicle?.vehicle
        ?.vehicleProductsProduct ?? []) {
        const product = new VehicleProductsProductEntity(vehicleProduct);
        await this.productRepos.save(product);

        // todo por cada producto agregar su reparacion individalmente
      }
    }
    const appointment = new Appointment(createAppointmentDto);
    const data = await this.appointmentRepos.save(appointment);
    return {
      appointment,
      message: {
        summary: 'Creado correctamente',
        detail: `cita ${data.id}`,
        severity: SeverityMessage.success,
      },
    };
  }

  async findAll(
    params: FilterAppointmentDto<Appointment>,
  ): Promise<IServerResponseModel<Appointment[]>> {
    const { page, limit } = params;
    const [entities, totalItems] = await this.appointmentRepos.findAndCount({
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: params.orderValue(),
      select: params.selectValue(),
    });
    return {
      data: entities,
      pagination: {
        totalItems,
        limit: limit,
        page,
      },
    };
  }

  async findOne(id: number) {
    const entity = await this.appointmentRepos.findOne({
      where: { id },
      relations: {
        appointmentVehicle: {
          vehicle: {
            vehicleProductsProduct: {
              product: true,
              child: {
                product: true,
              },
            },
          },
        },
      },
    });
    return {
      data: entity,
    };
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<IServerResponseModel<any>> {
    for (const appointmentVehicle of updateAppointmentDto.appointmentVehicle) {
      if (!appointmentVehicle?.vehicle_id) {
        const vehicle = new Vehicle(appointmentVehicle?.vehicle);
        await this.vehicleRepos.save(vehicle);
        appointmentVehicle.vehicle_id = vehicle.id;
        appointmentVehicle.vehicle = new CreateVehicleDto(vehicle);
      }

      for (const vehicleProduct of appointmentVehicle?.vehicle
        ?.vehicleProductsProduct ?? []) {
        const product = new VehicleProductsProductEntity(vehicleProduct);
        await this.productRepos.save(product);
      }
    }
    const data = await this.appointmentRepos.save(updateAppointmentDto);
    return {
      data: data,
      message: {
        summary: 'Actualizado correctamente',
        detail: `cita ${id}`,
        severity: SeverityMessage.success,
      },
    };
  }

  async remove(id: number) {
    await this.appointmentRepos.softRemove({ id });
    return {
      data: null,
      message: {
        summary: 'Eliminado correctamente',
        detail: `cita ${id}`,
        severity: SeverityMessage.success,
      },
    };
  }
}
