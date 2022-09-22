import { Appointment } from "../entities/appointments";

export interface AppointmentRepository {
  create(appointments: Appointment): Promise<void>;
  findOverlappingAppointments(
    startsAt: Date,
    endsAt: Date
  ): Promise<Appointment | null>;
}
