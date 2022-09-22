import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointments";
import { InMemoryAppointmentRepository } from "../repositories/in-memory/in-memory-appointments-repository";
import { getFutureDate } from "../tests/utils/get-future-date";
import { CreateAppointment } from "./create-appointment";

describe("Create Appointment", () => {
  it("should be able to create a new Appointment", () => {
    const repository = new InMemoryAppointmentRepository();
    const createAppointment = new CreateAppointment(repository);
    const startsAt = getFutureDate("2022-08-10");
    const endsAt = getFutureDate("2022-08-11");
    expect(
      createAppointment.execute({
        customer: "John",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });

  it("should not be able to create a new Appointment with overlapping dates", () => {
    const repository = new InMemoryAppointmentRepository();
    const createAppointment = new CreateAppointment(repository);
    const startsAt1 = getFutureDate("2022-08-09");
    const endsAt1 = getFutureDate("2022-08-11");

    createAppointment.execute({
      customer: "John",
      startsAt: startsAt1,
      endsAt: endsAt1,
    });

    expect(
      createAppointment.execute({
        customer: "John",
        startsAt: getFutureDate("2022-08-11"),
        endsAt: getFutureDate("2022-08-15"),
      })
    ).rejects;

    expect(
      createAppointment.execute({
        customer: "John",
        startsAt: getFutureDate("2022-08-10"),
        endsAt: getFutureDate("2022-08-15"),
      })
    ).rejects;

    expect(
      createAppointment.execute({
        customer: "John",
        startsAt: getFutureDate("2022-08-08"),
        endsAt: getFutureDate("2022-08-10"),
      })
    ).rejects;
  });
});
