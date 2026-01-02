import { useAuth } from '@/context/AuthContext';
import ClientDashboard from './ClientDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (user?.role === 'ADMIN' || user?.role === 'AGENT') {
    return <AdminDashboard />;
  }

  return <ClientDashboard />;
};

export default Dashboard;
