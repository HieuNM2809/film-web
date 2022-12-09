import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import linkSidebarLeft from '../../configs/configRoute';
import { NavLink } from 'react-router-dom';
import NewsFeed from '../../commons/NewsFeed/NewsFeed';

Home.propTypes = {

};

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    link: {
        textTransform: 'none !important',
        textDecoration: 'none !important',
        color: '#404040 !important',
    },
    likeCount: {
        fontSize: '1rem',
        fontWeight: 'normal',
    },
    tab: {
        marginBottom: '16px',
    }
}));

function Home(props) {
    const classes = useStyles();

    const [value, setValue] = useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    display: { xs: 'none', sm: 'block', md: 'block' },
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {linkSidebarLeft.filter(item => item.icon != null).map((item, index) => (
                            <NavLink to={item.path} className={classes.link}>
                                <ListItem key={index} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <item.icon />
                                        </ListItemIcon>
                                        <Typography style={{ textTransform: 'none' }} variant='button'>{item.label}</Typography>
                                    </ListItemButton>
                                </ListItem>
                            </NavLink>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Tabs
                    className={classes.tab}
                    value={value}
                    onChange={handleChange}
                    aria-label="wrapped label tabs example"
                >
                    <Tab
                        value="one"
                        label="Liên Quan"
                    />
                    <Tab value="two" label="Mới nhất" />
                    <Tab value="three" label="Top" />
                </Tabs>
                <NewsFeed />
            </Box>
        </>
    );
}

export default Home;