// Prototype-only report persistence using the browser's LocalStorage.
// There is no real backend or CCWD database connected — this module
// simulates "saving" a submitted report (customer side) and "updating" a
// report (admin/maintenance side), so all three interfaces stay in sync
// across My Reports, Incident Tracking, and the various dashboards.

import { reports as seedReports, STATUS_STEPS } from './mockData.js'

const STORAGE_KEY = 'waterserve_reports'
const OVERRIDES_KEY = 'waterserve_report_overrides'

export function getStoredReports() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function persist(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    return true
  } catch {
    return false
  }
}

function getOverrides() {
  try {
    const raw = localStorage.getItem(OVERRIDES_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function persistOverrides(map) {
  try {
    localStorage.setItem(OVERRIDES_KEY, JSON.stringify(map))
    return true
  } catch {
    return false
  }
}

export function getAllReports() {
  const stored = getStoredReports()
  const overrides = getOverrides()
  const storedCodes = new Set(stored.map((r) => r.trackingCode))

  const mergedStored = stored.map((r) => ({ ...r, ...(overrides[r.trackingCode] || {}) }))
  const mergedSeed = seedReports
    .filter((r) => !storedCodes.has(r.trackingCode))
    .map((r) => ({ ...r, ...(overrides[r.trackingCode] || {}) }))

  return [...mergedStored, ...mergedSeed]
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatDateTime(date) {
  const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return `${formatDate(date)} · ${time}`
}

export function generateTrackingCode() {
  const existingCodes = new Set(getAllReports().map((r) => r.trackingCode))
  let code
  do {
    const n = Math.floor(Math.random() * 100000)
    code = `WS-2026-${String(n).padStart(5, '0')}`
  } while (existingCodes.has(code))
  return code
}

export function saveReport({ type, address, description, photoDataUrl }) {
  const now = new Date()
  const trackingCode = generateTrackingCode()

  const baseReport = {
    id: `local-${Date.now()}`,
    trackingCode,
    type,
    description,
    address,
    dateSubmitted: formatDate(now),
    statusStep: 1,
    assignedTo: null,
    updates: [
      { step: 'Submitted', date: formatDateTime(now), note: 'Report received by WaterServe.' },
    ],
  }

  const reportWithPhoto = photoDataUrl ? { ...baseReport, photoDataUrl } : baseReport
  const existing = getStoredReports()

  let photoSaved = Boolean(photoDataUrl)
  let saved = persist([reportWithPhoto, ...existing])

  if (!saved && photoDataUrl) {
    photoSaved = false
    saved = persist([baseReport, ...existing])
  }

  return {
    report: photoSaved ? reportWithPhoto : baseReport,
    saved,
    photoSaved: saved && photoSaved,
  }
}

function patchReport(trackingCode, patch) {
  const stored = getStoredReports()
  const idx = stored.findIndex((r) => r.trackingCode === trackingCode)

  if (idx !== -1) {
    stored[idx] = { ...stored[idx], ...patch }
    persist(stored)
    return stored[idx]
  }

  const overrides = getOverrides()
  overrides[trackingCode] = { ...(overrides[trackingCode] || {}), ...patch }
  persistOverrides(overrides)

  const seed = seedReports.find((r) => r.trackingCode === trackingCode)
  return seed ? { ...seed, ...overrides[trackingCode] } : null
}

function withNewUpdateEntry(currentUpdates, statusStep, note) {
  const stepLabel = STATUS_STEPS[statusStep - 1]
  const alreadyLogged = (currentUpdates || []).some((u) => u.step === stepLabel)
  if (alreadyLogged) return currentUpdates
  return [...(currentUpdates || []), { step: stepLabel, date: formatDateTime(new Date()), note }]
}

/**
 * Admin/Maintenance action: update a report's status (and optionally who
 * it's assigned to, plus any extra fields like repair notes or a completion
 * photo). Appends a timeline entry so the customer sees the change
 * reflected in Incident Tracking too.
 */
export function updateReportStatus(trackingCode, { statusStep, assignedTo, note, ...extra }) {
  const current = getAllReports().find((r) => r.trackingCode === trackingCode)
  if (!current) return null

  const updates = withNewUpdateEntry(
    current.updates,
    statusStep,
    note || `Status updated to "${STATUS_STEPS[statusStep - 1]}" by CCWD staff.`
  )

  const patch = { statusStep, updates, ...extra }
  if (assignedTo !== undefined) patch.assignedTo = assignedTo

  return patchReport(trackingCode, patch)
}

export function assignPersonnel(trackingCode, personnelName) {
  return updateReportStatus(trackingCode, {
    statusStep: 2,
    assignedTo: personnelName,
    note: `Assigned to ${personnelName}.`,
  })
}


export function getReportNotifications() {
  return getAllReports().map((r) => {
    const latest = r.updates && r.updates.length > 0 ? r.updates[r.updates.length - 1] : null
    return {
      id: r.trackingCode,
      trackingCode: r.trackingCode,
      title: latest ? `${r.type} — ${latest.step}` : r.type,
      message: latest ? latest.note : 'Report received by WaterServe.',
      date: latest ? latest.date : r.dateSubmitted,
      read: r.statusStep >= 4,
    }
  })
}