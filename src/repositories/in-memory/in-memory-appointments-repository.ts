import { areIntervalsOverlapping } from "date-fns";
import { Appointment } from "../../entities/appointments";
import { AppointmentRepository } from "../appointments-repository";

export class InMemoryAppointmentRepository implements AppointmentRepository {
  public items: Appointment[] = [];

  async create(appointments: Appointment): Promise<void> {
    this.items.push(appointments);
  }
  async findOverlappingAppointments(
    startsAt: Date,
    endsAt: Date
  ): Promise<Appointment | null> {
    const overlappingAppointment = this.items.find((item) => {
      return areIntervalsOverlapping(
        { start: startsAt, end: endsAt },
        { start: item.startsAt, end: item.endsAt },
        { inclusive: true }
      );
    });

    if (!overlappingAppointment) {
      return null;
    } else {
      return overlappingAppointment;
    }
  }
}
