import { Container } from '@mui/material';
import React from 'react';
import { Route } from 'react-router-dom';

const RouteWithSubRoutes = (route) => {
    return (
        <>
            <Route
                path={route.path}
                exact={route.exact}
                element={(props) => (
                    <route.component {...props} routes={route.routes} {...route} />
                )}
            />
        </>
    );
};

export default RouteWithSubRoutes;
