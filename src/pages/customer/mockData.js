// Fictional demo data for the WaterServe prototype.
// No real backend or database is connected — everything here is static.

export const customerProfile = {
  name: 'Juan Dela Cruz',
  accountNumber: 'CCWD-004821',
  serviceAddress: 'Purok 3, Brgy. Balud, Calbayog City, Samar',
  status: 'Active',
  email: 'juan.delacruz@email.com',
  contactNumber: '0917 234 5678',
  memberSince: 'March 2022',
}

export const currentBill = {
  amount: 850.0,
  meterReading: '125 m³',
  previousReading: '112 m³',
  dueDate: 'September 15, 2026',
  billingPeriod: 'Aug 1 – Aug 31, 2026',
  status: 'Unpaid',
}

export const paymentHistory = [
  { id: 'PH-0231', date: 'Aug 12, 2026', amount: 780.0, method: 'GCash', status: 'Paid' },
  { id: 'PH-0198', date: 'Jul 11, 2026', amount: 810.5, method: 'Over-the-counter', status: 'Paid' },
  { id: 'PH-0164', date: 'Jun 10, 2026', amount: 745.0, method: 'GCash', status: 'Paid' },
  { id: 'PH-0129', date: 'May 09, 2026', amount: 802.25, method: 'Bank transfer', status: 'Paid' },
  { id: 'PH-0097', date: 'Apr 10, 2026', amount: 690.0, method: 'Over-the-counter', status: 'Paid' },
]

export const STATUS_STEPS = ['Submitted', 'Assigned', 'In Progress', 'Resolved']

export const reports = [
  {
    id: 'RPT-1',
    trackingCode: 'WS-2026-00125',
    type: 'Water Leak',
    description: 'Visible leak near the meter box, water pooling on the pavement.',
    address: 'Purok 3, Brgy. Balud, Calbayog City',
    dateSubmitted: 'Aug 29, 2026',
    statusStep: 2, // Assigned
    assignedTo: 'Mark Santos',
    updates: [
      { step: 'Submitted', date: 'Aug 29, 2026 · 8:14 AM', note: 'Report received by WaterServe.' },
      { step: 'Assigned', date: 'Aug 29, 2026 · 1:40 PM', note: 'Assigned to Mark Santos.' },
    ],
  },
  {
    id: 'RPT-2',
    trackingCode: 'WS-2026-00098',
    type: 'Low Water Pressure',
    description: 'Weak water flow during morning hours for the past three days.',
    address: 'Purok 3, Brgy. Balud, Calbayog City',
    dateSubmitted: 'Aug 14, 2026',
    statusStep: 4, // Resolved
    assignedTo: 'Pedro Reyes',
    updates: [
      { step: 'Submitted', date: 'Aug 14, 2026 · 7:02 AM', note: 'Report received by WaterServe.' },
      { step: 'Assigned', date: 'Aug 14, 2026 · 10:15 AM', note: 'Assigned to Pedro Reyes.' },
      { step: 'In Progress', date: 'Aug 15, 2026 · 8:30 AM', note: 'Valve inspection conducted.' },
      { step: 'Resolved', date: 'Aug 15, 2026 · 4:52 PM', note: 'Pressure regulator adjusted. Issue resolved.' },
    ],
  },
  {
    id: 'RPT-3',
    trackingCode: 'WS-2026-00061',
    type: 'Discolored Water',
    description: 'Brownish water from the tap after the recent pipeline work.',
    address: 'Purok 3, Brgy. Balud, Calbayog City',
    dateSubmitted: 'Jul 22, 2026',
    statusStep: 4, // Resolved
    assignedTo: 'John Garcia',
    updates: [
      { step: 'Submitted', date: 'Jul 22, 2026 · 6:45 AM', note: 'Report received by WaterServe.' },
      { step: 'Assigned', date: 'Jul 22, 2026 · 9:00 AM', note: 'Assigned to John Garcia.' },
      { step: 'In Progress', date: 'Jul 22, 2026 · 11:20 AM', note: 'Line flushing scheduled.' },
      { step: 'Resolved', date: 'Jul 23, 2026 · 3:10 PM', note: 'Line flushed. Water clarity confirmed normal.' },
    ],
  },
]

export const notifications = [
  {
    id: 'N-1',
    title: 'Crew dispatched for your water leak report',
    message: 'A maintenance crew has been dispatched to Purok 3, Brgy. Balud for tracking code WS-2026-00125.',
    date: 'Aug 30, 2026 · 9:05 AM',
    read: false,
  },
  {
    id: 'N-2',
    title: 'Your August bill is ready',
    message: '₱850.00 is due on September 15, 2026. Meter reading: 125 m³.',
    date: 'Aug 29, 2026 · 6:00 AM',
    read: false,
  },
  {
    id: 'N-3',
    title: 'Report WS-2026-00125 assigned',
    message: 'Your water leak report has been assigned to Mark Santos.',
    date: 'Aug 29, 2026 · 1:40 PM',
    read: true,
  },
  {
    id: 'N-4',
    title: 'Payment received',
    message: 'We received your payment of ₱780.00 for your July bill. Thank you!',
    date: 'Aug 12, 2026 · 2:18 PM',
    read: true,
  },
  {
    id: 'N-5',
    title: 'Report WS-2026-00098 resolved',
    message: 'Your low water pressure report has been marked resolved.',
    date: 'Aug 15, 2026 · 4:52 PM',
    read: true,
  },
]