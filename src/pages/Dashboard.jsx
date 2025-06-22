import { useState } from 'react';
import {Sidebar} from '../components/admin/adminDashboard/Sidebar';
import {Header} from '../components/admin/adminDashboard/Header';
import {DashboardStats} from '../components/admin/adminDashboard/DashboardStats';


export const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    console.log('Logging out...');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar handleLogout={handleLogout} />
      <div className="flex-1">
        <Header />
        <DashboardStats />
        <Sidebar/>
      </div>
    </div>
  );
};
