// Fictional demo data for the WaterServe admin prototype.
// No real backend or CCWD database is connected — everything here is
// static, except for incidents, which layer on top of the same
// LocalStorage-backed reports the customer side reads and writes.

import { customerProfile } from '../customer/mockData.js'
import { getAllReports } from '../customer/reportsStore.js'

export const MAINTENANCE_PERSONNEL = ['Mark Santos', 'Pedro Reyes', 'John Garcia']

// This prototype only has one "logged in" customer account (Juan Dela Cruz,
// whose bills/reports are the ones that actually flow through the app).
// The rest are static sample rows so the admin Customers/Billing pages have
// something realistic to show.
export const customers = [
  {
    accountNumber: customerProfile.accountNumber,
    name: customerProfile.name,
    address: customerProfile.serviceAddress,
    contactNumber: customerProfile.contactNumber,
    email: customerProfile.email,
    status: customerProfile.status,
    memberSince: customerProfile.memberSince,
  },
  {
    accountNumber: 'CCWD-004822',
    name: 'Maria Santos',
    address: 'Purok 5, Brgy. Trinidad, Calbayog City, Samar',
    contactNumber: '0918 345 1122',
    email: 'maria.santos@email.com',
    status: 'Active',
    memberSince: 'January 2021',
  },
  {
    accountNumber: 'CCWD-004910',
    name: 'Ramon Villanueva',
    address: 'Purok 1, Brgy. Obrero, Calbayog City, Samar',
    contactNumber: '0920 556 7788',
    email: 'ramon.villanueva@email.com',
    status: 'Active',
    memberSince: 'August 2020',
  },
  {
    accountNumber: 'CCWD-005102',
    name: 'Ana Bautista',
    address: 'Purok 2, Brgy. Rawis, Calbayog City, Samar',
    contactNumber: '0917 998 2211',
    email: 'ana.bautista@email.com',
    status: 'Delinquent',
    memberSince: 'May 2023',
  },
  {
    accountNumber: 'CCWD-005230',
    name: 'Carlos Mendoza',
    address: 'Purok 4, Brgy. Sooc, Calbayog City, Samar',
    contactNumber: '0919 221 4433',
    email: 'carlos.mendoza@email.com',
    status: 'Active',
    memberSince: 'November 2019',
  },
  {
    accountNumber: 'CCWD-005388',
    name: 'Liza Fernandez',
    address: 'Purok 3, Brgy. Central, Calbayog City, Samar',
    contactNumber: '0921 774 6655',
    email: 'liza.fernandez@email.com',
    status: 'Active',
    memberSince: 'February 2022',
  },
]

// Fictional district-wide figure for the "Total Customers" summary card —
// the table above only shows a sample for this prototype.
export const TOTAL_CUSTOMERS = 12406

export const billingRecords = [
  { accountNumber: customerProfile.accountNumber, name: customerProfile.name, amount: 850.0, dueDate: 'Sep 15, 2026', status: 'Unpaid' },
  { accountNumber: 'CCWD-004822', name: 'Maria Santos', amount: 612.5, dueDate: 'Sep 12, 2026', status: 'Unpaid' },
  { accountNumber: 'CCWD-004910', name: 'Ramon Villanueva', amount: 730.0, dueDate: 'Sep 10, 2026', status: 'Paid' },
  { accountNumber: 'CCWD-005102', name: 'Ana Bautista', amount: 990.25, dueDate: 'Aug 28, 2026', status: 'Overdue' },
  { accountNumber: 'CCWD-005230', name: 'Carlos Mendoza', amount: 540.0, dueDate: 'Sep 14, 2026', status: 'Paid' },
  { accountNumber: 'CCWD-005388', name: 'Liza Fernandez', amount: 675.75, dueDate: 'Sep 11, 2026', status: 'Unpaid' },
]

// Every reported incident, enriched with the reporting customer's details.
// This prototype only tracks one real customer's reports (the whole app is
// single-account on the customer side), so that profile is attached here.
export function getIncidentsForAdmin() {
  return getAllReports().map((r) => ({
    ...r,
    customerName: customerProfile.name,
    accountNumber: customerProfile.accountNumber,
    assignedTo: r.assignedTo || null,
  }))
}

export function adminStatusLabel(step) {
  if (step === 1) return 'Pending'
  if (step === 2) return 'Assigned'
  if (step === 3) return 'In Progress'
  return 'Resolved'
}

export function adminStatusPillClass(step) {
  if (step >= 4) return 'pill-resolved'
  if (step === 3) return 'pill-inprogress'
  if (step === 2) return 'pill-assigned'
  return 'pill-submitted'
}