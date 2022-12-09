import React, { useState } from 'react';
import { Avatar, Box, Button, Card, CardContent, CardMedia, Grid, IconButton, Menu, MenuItem, Paper, Toolbar, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { getDetailPost, savePost } from '../../api/post';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CommentIcon from '../../assets/svg/Comment';
import LikeIcon from '../../assets/svg/Like.js';
import image3 from '../../assets/img/image3.png';
import moment from 'moment';
import { useEffect } from 'react';

SinglePost.propTypes = {

};

const useStyles = makeStyles((theme) => ({
    link: {
        textTransform: 'none !important',
    },
    title: {
        color: 'rgb(23,23,23)',
        lineHeight: 1.25,
        fontSize: '3rem !important',
        overflowWrap: 'anywhere',
        wordBreak: 'break-word',
        marginBottom: '0.25rem',
        fontWeight: 'bold !important'
    },
    likeCount: {
        fontSize: '1rem',
        fontWeight: 'normal',
    },
    name: {
        fontSize: '0.875rem',
        fontWeight: 500,
        textDecoration: 'none',
        color: '#3d3d3d',
    },
    datetime: {
        color: 'rgb(82,82,82)',
        fontSize: '0.75rem !important',
    },
}));

function SinglePost(props) {
    const classes = useStyles();
    const navigate = useNavigate();
    const idUser = useSelector((state) => state.user?.currentUser?.id);
    const [post, setPost] = useState({});
    const param = useParams();

    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        getDetailPost(param.postId)
            .then((res) => {
                setPost(res.data.data)
            })
    }, [])

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSavePost = () => {
        const data = {
            id_user: idUser,
            id_post: param.postId,
        };
        savePost(data)
            .then((res) => {
                alert(res.message);
            })
            .catch((err) => {
                alert(err.message);
            })
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleTopic = () => {
        navigate(`/topic/${post.title_type.id}`)
    }

    return (
        <>
            <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
                <Toolbar />
                <Grid container>
                    <Grid item xs={12} md={9}>
                        <Card style={{ marginBottom: '1rem' }}>
                            <CardMedia
                                component="img"
                                alt="feature image"
                                image={image3}
                            />
                            <CardContent>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: { xs: "0px 16px", md: "0px 32px" } }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar
                                            alt="avatar"
                                            src={post?.user?.avatar}
                                            sx={{ width: 32, height: 32 }}
                                        />
                                        <Box style={{ marginLeft: "0.3rem" }}>
                                            <Link to={`/profile/${post?.user?.id}`} className={classes.name}>{post?.user?.name}</Link>
                                            <Typography className={classes.datetime}>Đăng vào {moment(post?.created_at).format('LLL')}</Typography>
                                        </Box>
                                    </div>
                                    <div>
                                        <IconButton
                                            size="large"
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={handleMenu}
                                            color="inherit"
                                        >
                                            <MoreHorizIcon />
                                        </IconButton>
                                        <Menu
                                            id="menu-appbar"
                                            anchorEl={anchorEl}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                        >
                                            <MenuItem onClick={handleSavePost}>Lưu</MenuItem>
                                            <MenuItem onClick={handleClose}>Báo cáo</MenuItem>
                                        </Menu>
                                    </div>
                                </div>
                                <div style={{ padding: { xs: "0px 16px", sm: '0px 16px', md: "0px 32px" } }}>
                                    <Typography variant="h1" className={classes.title}>
                                        {post?.title}
                                    </Typography>
                                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                        <Button onClick={handleTopic} className={classes.link} style={{ color: `${post?.title_type?.color}`, }}>{post?.title_type?.type}</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>

                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default SinglePost;