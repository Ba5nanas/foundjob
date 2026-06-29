import { describe, expect, it } from "vitest";
import { AppointmentService, appointmentServiceManifest } from "./domain-service";

describe("AppointmentService", () => {
  it("declares the appointment socket contract", () => {
    expect(appointmentServiceManifest.socketEnv).toBe("APPOINTMENT_SERVICE_SOCKET");
  });

  it("returns an ok health payload", () => {
    expect(new AppointmentService().health()).toEqual({ service: "appointment-service", status: "ok" });
  });
});
