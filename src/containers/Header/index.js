import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Badge, Box, Button, IconButton, Toolbar, Divider, InputBase, Paper, MenuList, Avatar } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import devlogo from '../../assets/img/devlogo.png';
import SearchIcon from '../../assets/svg/SearchIcon';
import NotiIcon from '../../assets/svg/NotiIcon';
import { makeStyles } from '@mui/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../api/auth';

Header.propTypes = {
    authentication: PropTypes.bool,
};

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#6F6F6F',
    border: '1px solid rgb(212,212,212)',
    borderRadius: '0.375rem',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '350px',
        },
    },
    '& .MuiInputBase-input:focus': {
        borderRadius: '0.375rem',
        borderColor: 'rgb(59, 73, 223)',
        boxShadow: '0 0 0 1px rgb(59, 73, 223)'
    },
}));


const useStyles = makeStyles((theme) => ({
    root: {
    },
    header: {
        backgroundColor: '#fff !important',
        color: '#000 !important',
    },
    link: {
        textDecoration: 'none',
        '& .MuiButton-text': {
            color: theme.color.base60,
            '&:hover': {
                backgroundColor: theme.color.base10,
            }
        }
    },
    menu: {
        width: '290px',
    }
}));

function Header(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const menuId = 'primary-search-account-menu';
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const user = useSelector((state) => state.user?.currentUser);
    const accessToken = useSelector((state) => state.auth.login?.token);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?key=${searchTerm}`);
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        logOut(dispatch, user?.id, navigate, accessToken);
        setAnchorEl(null);
    };

    const handleProfile = () => {
        navigate(`/profile/${user?.id}`)
        setAnchorEl(null);
    };

    const handleReadingList = () => {
        navigate(`/reading-list`)
        setAnchorEl(null);
    };

    const handleSetting = () => {
        navigate(`/setting`)
        setAnchorEl(null);
    };

    const handleNew = () => {
        navigate(`/new`)
        setAnchorEl(null);
    };

    const handleOrganization = () => {
        navigate(`/organization`)
        setAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Paper sx={{ width: 250, maxWidth: '100%', boxShadow: 'none' }}>
                <MenuList>
                    <MenuItem onClick={handleProfile}>
                        <div>
                            <div style={{ fontSize: '1.35rem' }}>
                                <strong>{user?.name}</strong>
                            </div>
                            <div>{user?.email}</div>
                        </div>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleNew}>Đăng Bài</MenuItem>
                    <MenuItem onClick={handleReadingList}>Danh sách đã lưu</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Chuỗi bài viết</MenuItem>
                    <MenuItem onClick={handleOrganization}>Tổ Chức</MenuItem>
                    <MenuItem onClick={handleSetting}>Cài đặt</MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                </MenuList>
            </Paper>
        </Menu>
    );
    return (
        <>
            <AppBar className={classes.header} position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Link to='/home'>
                        <img src={devlogo} alt="devlogo" />
                    </Link>
                    <Search sx={{ display: 'flex', width: { xs: '180px' } }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <form onSubmit={handleSearch}>
                            <StyledInputBase
                                onChange={(e) => { setSearchTerm(e.target.value) }}
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </form>
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { md: 'flex' }, alignItems: 'center' }}>
                        {
                            props?.authentication
                                ? <>
                                    <Link to="/new" className={classes.link}>
                                        <Button sx={{ display: { xs: 'none', md: 'block' } }} variant="outlined" size="medium" style={{ marginRight: "0.5rem" }}>
                                            Đăng Bài
                                        </Button>
                                    </Link>
                                    <IconButton
                                        size="medium"
                                        aria-label="show 17 new notifications"
                                        color="inherit"
                                        style={{ marginRight: "0.5rem" }}
                                    >
                                        <Badge badgeContent={17} color="error">
                                            <NotiIcon />
                                        </Badge>
                                    </IconButton>
                                    <IconButton
                                        size="medium"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        color="inherit"
                                        className={classes.padding}
                                    >
                                        <Avatar
                                            alt={`avatar ${user?.name}`}
                                            src={`${process.env.REACT_APP_ENDPOINT}/user/${user?.avatar}`}
                                            sx={{ width: 32, height: 32 }}
                                        />
                                    </IconButton>
                                </>
                                : <>
                                    <Link to='/login' className={classes.link}>
                                        <Button variant="text" size="large" style={{ marginRight: "0.5rem", textTransform: 'none' }}>
                                            Đăng Nhập
                                        </Button>
                                    </Link>
                                    <Link to='/register' className={classes.link}>
                                        <Button variant="outlined" size="large" style={{ marginRight: "0.5rem", textTransform: 'none' }}>
                                            Đăng Ký
                                        </Button>
                                    </Link>
                                </>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </>
    );
}

export default Header;