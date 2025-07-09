import React from 'react';
import useAuth from '../../Hooks/useAuth';
import Loading from '../Loading/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRouter = ({children}) => {

    const {loading, user} = useAuth();
    const location = useLocation();

    if(loading) {
        return <Loading />
    }
    if(!user) {
        <Navigate state={{from: location.pathname}} to={'/login'}/>
    }
    return children;
};

export default PrivateRouter;