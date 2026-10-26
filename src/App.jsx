import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'

import CustomerLayout from './pages/customer/CustomerLayout.jsx'
import Dashboard from './pages/customer/Dashboard.jsx'
import MyBill from './pages/customer/MyBill.jsx'
import PaymentHistory from './pages/customer/PaymentHistory.jsx'
import ReportIssue from './pages/customer/ReportIssue.jsx'
import MyReports from './pages/customer/MyReports.jsx'
import IncidentTracking from './pages/customer/IncidentTracking.jsx'
import Notifications from './pages/customer/Notifications.jsx'
import Profile from './pages/customer/Profile.jsx'

import AdminLayout from './pages/admin/AdminLayout.jsx'
import AdminDashboard from './pages/admin/Dashboard.jsx'
import AdminIncidents from './pages/admin/Incidents.jsx'
import AdminIncidentDetail from './pages/admin/IncidentDetail.jsx'
import AdminCustomers from './pages/admin/Customers.jsx'
import AdminBilling from './pages/admin/Billing.jsx'
import AdminMaintenance from './pages/admin/Maintenance.jsx'

import MaintenanceLayout from './pages/maintenance/MaintenanceLayout.jsx'
import MaintenanceDashboard from './pages/maintenance/Dashboard.jsx'
import WorkOrders from './pages/maintenance/WorkOrders.jsx'
import WorkOrderDetail from './pages/maintenance/WorkOrderDetail.jsx'
import MaintenanceNotifications from './pages/maintenance/Notifications.jsx'
import MaintenanceProfile from './pages/maintenance/Profile.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/customer" element={<CustomerLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="bill" element={<MyBill />} />
        <Route path="payments" element={<PaymentHistory />} />
        <Route path="report" element={<ReportIssue />} />
        <Route path="reports" element={<MyReports />} />
        <Route path="reports/:trackingCode" element={<IncidentTracking />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="incidents" element={<AdminIncidents />} />
        <Route path="incidents/:trackingCode" element={<AdminIncidentDetail />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="billing" element={<AdminBilling />} />
        <Route path="maintenance" element={<AdminMaintenance />} />
      </Route>

      <Route path="/maintenance" element={<MaintenanceLayout />}>
        <Route index element={<MaintenanceDashboard />} />
        <Route path="orders" element={<WorkOrders />} />
        <Route path="orders/:trackingCode" element={<WorkOrderDetail />} />
        <Route path="notifications" element={<MaintenanceNotifications />} />
        <Route path="profile" element={<MaintenanceProfile />} />
      </Route>
    </Routes>
  )
}