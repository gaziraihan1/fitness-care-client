import { Navigate } from 'react-router';
import useUserRole from '../../Hooks/useUserRole';
import useAuth from '../../Hooks/useAuth';


const MemberRoute = ({ children }) => {
    const {user} = useAuth()
  const [role, loading] = useUserRole();

  if (loading) return <span>Checking access...</span>;
  if (!user || role !== 'member') return <Navigate to="/forbidden" replace />;

  return children;
};

export default MemberRoute;
