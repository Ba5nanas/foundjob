export const kafkaTopics = {
  applicationApplied: "application.applied",
  applicationHired: "application.hired",
  applicationRejected: "application.rejected",
  jobFilled: "job.filled",
  appointmentCreated: "appointment.created",
  emailSend: "email.send",
  employeeContractExpiring: "employee.contract_expiring",
  employeeContractExpired: "employee.contract_expired",
  employeeContractRenewed: "employee.contract_renewed",
  employeeEnded: "employee.ended",
  fileUploaded: "file.uploaded",
  fileDeleted: "file.deleted",
  fileRemoteSyncRequested: "file.remote_sync_requested",
  fileRemoteSynced: "file.remote_synced",
  fileRemoteSyncFailed: "file.remote_sync_failed",
  fileVirusScanRequested: "file.virus_scan_requested",
  fileVirusScanCompleted: "file.virus_scan_completed"
} as const;

export type KafkaTopic = (typeof kafkaTopics)[keyof typeof kafkaTopics];

export interface KafkaEventEnvelope<TPayload> {
  id: string;
  topic: KafkaTopic;
  occurredAt: string;
  producer: string;
  payload: TPayload;
}
