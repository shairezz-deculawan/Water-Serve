// Data layer for the CCWD Maintenance Staff prototype.
// No real backend is connected — work orders are the same reports the
// customer and admin interfaces read/write via reportsStore.js's
// LocalStorage layer, filtered down to whichever personnel is "logged in".

import { getAllReports, updateReportStatus } from '../customer/reportsStore.js'

// This prototype only has one "logged in" maintenance account. Mark Santos
// is one of the three personnel admins can assign reports to, so any report
// assigned to him shows up here as a work order.
export const MAINTENANCE_STAFF = {
  name: 'Mark Santos',
  role: 'Field Maintenance Technician',
  email: 'mark.santos@ccwd.gov.ph',
  contactNumber: '0917 555 0142',
  employeeId: 'CCWD-STAFF-0231',
}

// "WS-2026-00125" -> "WO-00125"
export function trackingCodeToWorkOrderId(trackingCode) {
  const parts = trackingCode.split('-')
  return `WO-${parts[parts.length - 1]}`
}

export function getMyWorkOrders() {
  return getAllReports()
    .filter((r) => r.assignedTo === MAINTENANCE_STAFF.name)
    .map((r) => ({ ...r, workOrderId: trackingCodeToWorkOrderId(r.trackingCode) }))
}

export function getWorkOrder(trackingCode) {
  return getMyWorkOrders().find((r) => r.trackingCode === trackingCode) || null
}

export function maintenanceStatusLabel(step) {
  if (step === 1) return 'Submitted'
  if (step === 2) return 'Assigned'
  if (step === 3) return 'In Progress'
  return 'Resolved'
}

export function maintenanceStatusPillClass(step) {
  if (step >= 4) return 'pill-resolved'
  if (step === 3) return 'pill-inprogress'
  if (step === 2) return 'pill-assigned'
  return 'pill-submitted'
}

// Start Work: Assigned (2) -> In Progress (3)
export function startWork(trackingCode) {
  return updateReportStatus(trackingCode, {
    statusStep: 3,
    note: `${MAINTENANCE_STAFF.name} started work on this report.`,
  })
}

// Mark as Resolved: In Progress (3) -> Resolved (4).
// Saves the repair notes and, if provided, a completion photo.
export function resolveWorkOrder(trackingCode, { repairNotes, completionPhotoDataUrl }) {
  return updateReportStatus(trackingCode, {
    statusStep: 4,
    repairNotes,
    completionPhotoDataUrl: completionPhotoDataUrl || undefined,
    note: `Marked resolved by ${MAINTENANCE_STAFF.name}.${repairNotes ? ` Notes: ${repairNotes}` : ''}`,
  })
}