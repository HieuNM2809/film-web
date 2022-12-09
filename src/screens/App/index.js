import './App.scss';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../../containers/Header/index';
import { makeStyles } from '@mui/styles';
import linkSidebarLeft from '../../configs/configRoute';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../containers/Footer';
import { getDataUser } from '../../api/auth';
const useStyles = makeStyles((theme) => ({
  root: {
  },
  link: {
    textDecoration: 'none',
    color: '#404040',
  }
}));



function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const token = useSelector((state) => state.auth?.login?.token);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      // getDataUser(token, dispatch)
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     setIsAuthenticated(false);
      //     console.log(err)
      //   })
    }
  }, [token]);

  return (
    <div className={classes.root}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {
          window.location.pathname == '/new' ? "" : <Header authentication={isAuthenticated} />
        }
        <Routes>
          {isAuthenticated
            ? linkSidebarLeft &&
            linkSidebarLeft.map((route, index) => (
              <Route key={index} path={route.path}
                exact={route.exact}
                element={
                  <route.component />
                } >
                {route.subRoutes && route.subRoutes.map((subRoute) => <Route path={subRoute.path} element={<subRoute.component />} />)}
              </Route>
            ))
            : linkSidebarLeft &&
            linkSidebarLeft.filter(item => item.public === true).map((route, index) => (
              <Route key={index} path={route.path}
                exact={route.exact}
                element={
                  <route.component />
                } >
                {route.subRoutes && route.subRoutes.map((subRoute) => <Route path={subRoute.path} element={<subRoute.component />} />)}
              </Route>
            ))
          }
        </Routes>
      </Box>
      {
        window.location.pathname === '/' ? "" : <Footer />
          && window.location.pathname === '/home' ? "" : <Footer />
            && window.location.pathname === '/new' ? "" : <Footer />
      }

    </div>
  );
}

export default App;
