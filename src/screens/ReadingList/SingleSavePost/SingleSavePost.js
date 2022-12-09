import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { getUserById } from '../../../api/user';
import { getDetailTopic } from '../../../api/topic';

SingleSavePost.propTypes = {
     savePost: PropTypes.object,
     unSavePost: PropTypes.func
};

const useStyles = makeStyles((theme) => ({
     link: {
          textTransform: 'none !important',
     },
     title: {
          '&.css-gepadz-MuiTypography-root': {
               color: 'rgb(23,23,23)',
               fontSize: '1.5rem',
               overflowWrap: 'anywhere',
               wordBreak: 'break-word',
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
          marginRight: '0.5rem',
     },
     datetime: {
          color: 'rgb(82,82,82)',
          fontSize: '0.75rem !important',
     },
}));

function SingleSavePost(props) {

     const classes = useStyles();
     const navigate = useNavigate();
     const [user, setUser] = useState({});
     const [topic, setTopic] = useState({});
     const idUser = useSelector((state) => state.user?.currentUser?.id);

     const data = {
          id: props?.savePost?.id ,
          id_user: idUser,
          id_post: props?.savePost?.id_post,
     }

     useEffect(() => {
          getUserById(props?.savePost?.post?.id_user)
               .then((res) => {
                    setUser(res.data.data);
               })
               .catch((error) => {
                    console.log(error.message);
               });
          getDetailTopic(props?.savePost?.post?.id_user)
               .then((res) => {
                    setTopic(res.data.data[0]);
               })
               .catch((error) => {
                    console.log(error.message);
               });
     }, [props?.savePost?.post?.id_user]);

     const handleTopic = () => {
          navigate(`/topic/${topic.id}`)
     }


     return (
          <Grid style={{ alignItems: 'center', justifyContent: 'space-around', marginBottom: '1rem' }} container>
               <Grid item>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                         <Avatar
                              alt="avatar"
                              src={'props.post.user.avatar'}
                              sx={{ width: 48, height: 48 }}
                         />
                    </div>
               </Grid>
               <Grid item xs={10}>
                    <div style={{ paddingLeft: "32px" }}>
                         <Link to={`/alo123`} style={{ textDecoration: 'none' }}>
                              <Typography variant="h3" className={classes.title}>
                                   {props?.savePost?.post?.title}
                              </Typography>
                         </Link>
                         <div style={{ display: 'flex', alignItems: 'baseline' }}>
                              <Box style={{ marginLeft: "0.3rem", display: 'flex', alignItems: 'baseline' }}>
                                   <Link to={`/profile/${user?.id}`} className={classes.name}>{user?.name}</Link>
                                   <Typography className={classes.datetime}>{moment(props?.savePost?.post?.created_at).format('L')}</Typography>
                              </Box>
                              <Button onClick={handleTopic} className={classes.link} style={{ color: `${topic?.color}`, }}>{topic?.type}</Button>
                         </div>
                    </div>
               </Grid>
               <Grid item>
                    <Button container onClick={() => { props.unSavePost(data) }} className={classes.link} variant="contained" color="inherit">Bỏ Lưu</Button>
               </Grid>
          </Grid>
     );
}

export default SingleSavePost;