import { Navigate } from 'react-router';
import useUserRole from '../../Hooks/useUserRole';
import useAuth from '../../Hooks/useAuth';

const TrainerRoute = ({ children }) => {
    const {user} = useAuth();
  const [role, roleLoading] = useUserRole();

  if (roleLoading) return <span>Checking role...</span>;
  if (!user || role !== 'trainer') return <Navigate to="/forbidden" replace />;

  return children;
};

export default TrainerRoute;
