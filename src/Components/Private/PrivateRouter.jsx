import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRouter = ({children}) => {

    const {loading, user} = useAuth();
    const location = useLocation();

    if(loading) {
        return <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
    }
    if(!user) {
        return <Navigate state={location.pathname} replace to={'/login'}/>
    }
    return children;
    
};

export default PrivateRouter;