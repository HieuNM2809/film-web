import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Card, CardContent, CardMedia, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import image3 from '../../../assets/img/image3.png';
import LikeIcon from '../../../assets/svg/Like.js';
import CommentIcon from '../../../assets/svg/Comment.js';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { savePost } from '../../../api/post';

Post.propTypes = {
     post: PropTypes.object
};

const useStyles = makeStyles((theme) => ({
     link: {
          textTransform: 'none !important',
     },
     title: {
          '&.css-gepadz-MuiTypography-root': {
               color: 'rgb(23,23,23)',
               lineHeight: 1.25,
               fontSize: '1.875rem',
               overflowWrap: 'anywhere',
               wordBreak: 'break-word',
               marginBottom: '0.25rem',
               fontWeight: 'bold !important',
          }
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


function Post(props) {
     const classes = useStyles();
     const navigate = useNavigate();
     const idUser = useSelector((state) => state.user?.currentUser?.id);

     const [anchorEl, setAnchorEl] = useState(null);

     const handleMenu = (event) => {
          setAnchorEl(event.currentTarget);
     };

     const handleSavePost = () => {
          const data = {
               id_user: idUser,
               id_post: props?.post?.id,
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
          navigate(`/topic/${props.post.title_type.id}`)
     }

     return (
          <Card style={{ marginBottom: '1rem' }}>
               <CardMedia
                    component="img"
                    alt="feature image"
                    image={image3}
               />
               <CardContent>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                         <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar
                                   alt="avatar"
                                   src={props.post.user.avatar}
                                   sx={{ width: 32, height: 32 }}
                              />
                              <Box style={{ marginLeft: "0.3rem" }}>
                                   <Link to={`/profile/${props.post.user.id}`} className={classes.name}>{props.post.user.name}</Link>
                                   <Typography className={classes.datetime}>Đăng vào {moment(props.post.created_at).format('LLL')}</Typography>
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
                    <div style={{ paddingLeft: "32px" }}>
                         <Link to={`/${props.post.user.name}/${props.post.id}`} style={{ textDecoration: 'none' }}>
                              <Typography variant="h3" className={classes.title}>
                                   {props.post.title}
                              </Typography>
                         </Link>
                         <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                              <Button onClick={handleTopic} className={classes.link} style={{ color: `${props.post.title_type.color}`, }}>{props.post.title_type.type}</Button>
                         </div>
                         <Button
                              className={classes.link}
                              size="large"
                              color="inherit"
                              style={{ alignItems: 'flex-start', marginRight: "0.5rem" }}
                         >
                              <LikeIcon />
                              <span className={classes.likeCount}>12 Thích</span>
                         </Button>
                         <Button
                              className={classes.link}
                              size="large"
                              color="inherit"
                              style={{ alignItems: 'flex-start', marginRight: "0.5rem" }}
                         >
                              <CommentIcon />
                              <span className={classes.likeCount}>2 Bình luận</span>
                         </Button>
                    </div>
               </CardContent>
          </Card>
     );
}

export default Post;