import { describe, expect, it } from "vitest";
import {
  cancelAdminAppointment,
  getAdminAppointment,
  listAdminAppointments,
  updateAdminAppointment
} from "./admin-appointments";

describe("admin appointments demo handlers", () => {
  it("lists appointments with supported operations", () => {
    expect(listAdminAppointments()).toMatchObject({
      total: 3,
      operations: ["read", "reschedule", "cancel"]
    });
  });

  it("reads a single appointment", () => {
    expect(getAdminAppointment("appt_001")).toMatchObject({
      id: "appt_001",
      jobTitle: "Frontend Developer"
    });
  });

  it("reschedules an appointment", () => {
    expect(
      updateAdminAppointment("appt_001", {
        scheduledAt: "2026-07-03T11:00:00.000Z",
        mode: "ONSITE"
      })
    ).toMatchObject({
      id: "appt_001",
      scheduledAt: "2026-07-03T11:00:00.000Z",
      mode: "ONSITE",
      status: "RESCHEDULED"
    });
  });

  it("cancels an appointment with an audit-facing reason", () => {
    expect(cancelAdminAppointment("appt_001", { reason: "Candidate unavailable" })).toMatchObject({
      id: "appt_001",
      status: "CANCELLED",
      cancellationReason: "Candidate unavailable"
    });
  });
});
