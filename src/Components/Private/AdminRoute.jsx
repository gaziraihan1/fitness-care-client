import { Navigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import useUserRole from '../../Hooks/useUserRole';


const AdminRoute = ({ children }) => {
    const {user} = useAuth();
  const [role, loading] = useUserRole();

  if (loading) return <span>Checking role...</span>;
  if (!user || role !== 'admin') return <Navigate to="/forbidden" replace />;

  return children;
};

export default AdminRoute;
