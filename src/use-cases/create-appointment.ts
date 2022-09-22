import { Appointment } from "../entities/appointments";

interface CreateAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}
type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
  constructor(private appointmentsRepository = appointmentsRepository) {}

  async execute({
    customer,
    startsAt,
    endsAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overlappingAppointment =
      await this.appointmentsRepository.findOverlappingAppointments(
        startsAt,
        endsAt
      );

    if (overlappingAppointment) {
      throw new Error("Overlapping");
    }
    const appointments = new Appointment({ customer, startsAt, endsAt });
    await this.appointmentsRepository.create(appointments);
    return appointments;
  }
}
