import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';


function ProtectedRoute(props: { children: any; }) {
    const { author} = useContext(AuthContext);
    return (
        <>{author ? props.children : <Navigate to={'/login'} />}</>
    )
}

export default ProtectedRoute