import React, { useEffect, useState } from 'react';
import { Avatar, Box, Card, Divider, Grid, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import ducbang from '../../../src/assets/img/153156931_447157583096627_5512326598805374028_n.jpg';
import moment from 'moment';
import { faBirthdayCake, faLocationPin } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewsFeed from '../../commons/NewsFeed/NewsFeed';
import { getUserById } from '../../api/user';
import { useParams } from 'react-router-dom';
import Post from '../../commons/NewsFeed/Post';
import { getPostByUserId } from '../../api/post';


const useStyles = makeStyles((theme) => ({
     card: {
          position: "relative",
          width: '100%',
          height: '5rem',
     },
     coverAvt: {
          display: "flex",
          padding: "10px",
          borderRadius: "50%",
          position: "absolute",
          top: '90px',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 100
     },
     rightPost: {
          margin: '1rem 0rem',
          '@media (min-width:900px)': {
               margin: '1rem 0rem 0rem 1rem',
          },
     }
}));

function Profile() {
     const classes = useStyles();
     const [user, setUser] = useState([]);
     const [posts, setPosts] = useState([]);
     const { userId } = useParams()
     const userJoinDay = moment(user?.create_at).format('LL');

     useEffect(() => {
          getUserById(userId)
               .then((res) => {
                    setUser(res.data.data);
               })
               .catch((error) => {
                    console.log(error.message);
               });
          getPostByUserId({ sort: 'DESC', id_user: userId })
               .then((res) => {
                    setPosts(res.data.data);
               })
               .catch((error) => {
                    console.log(error.message);
               });
     }, [userId]);

     return (
          <>
               <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
                    <Toolbar />
                    <Grid >
                         <div style={{ position: "relative" }}>
                              <div className={classes.card} style={{ backgroundColor: 'rgb(59, 73, 223)', }}></div>
                              <div className={classes.coverAvt} style={{ backgroundColor: 'rgb(59, 73, 223)' }}>
                                   <Avatar
                                        alt={`avatar ${user?.name}`}
                                        src={`${process.env.REACT_APP_ENDPOINT}/user/${user?.avatar}`}
                                        sx={{
                                             width: "8rem",
                                             height: "8rem",
                                        }}
                                   />
                              </div>
                              <Card style={{ padding: 20 }}>
                                   <div style={{ paddingTop: "5rem" }}>
                                        <Typography variant='h4' style={{ textAlign: "center", fontWeight: "400" }}>{user?.name}</Typography>
                                        <Typography style={{ textAlign: "center", margin: '1rem 0rem' }}>{user?.bio}</Typography>
                                        <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                             <FontAwesomeIcon icon={faBirthdayCake} style={{ padding: 2 }} />
                                             <div style={{ padding: '10px' }}>{userJoinDay}</div>
                                             {
                                                  user?.location
                                                       ? <>
                                                            <FontAwesomeIcon icon={faLocationPin} style={{ padding: '10px' }} />
                                                            <div style={{ padding: '10px' }}>{user?.location}</div>
                                                       </>
                                                       : ""
                                             }
                                        </div>
                                        <Divider />
                                        <Grid container style={{ paddingTop: '1rem' }}>
                                             <Grid item xs={12} md={6}>
                                                  <Typography style={{ textAlign: "center", fontWeight: "bold" }}>Nơi làm việc</Typography>
                                                  <Typography style={{ textAlign: "center", margin: '1rem 0rem' }}>{user?.work}</Typography>
                                             </Grid>
                                             <Grid item xs={12} md={6}>
                                                  <Typography style={{ textAlign: "center", fontWeight: "bold" }}>Học Vấn</Typography>
                                                  <Typography style={{ textAlign: "center", margin: '1rem 0rem' }}>{user?.education}</Typography>
                                             </Grid>
                                        </Grid>
                                   </div>
                              </Card>
                              <Grid container>
                                   <Grid item xs={12} md={3}>
                                        <Card style={{ margin: "1rem 0rem" }}>
                                             <Typography style={{ padding: "0.5rem 1rem" }}>Người Theo Dõi</Typography>
                                             <Typography style={{ padding: "0.5rem 1rem" }}>Dang Theo Dõi</Typography>
                                             <Typography style={{ padding: "0.5rem 1rem" }}>Bài viết xuất bản</Typography>
                                        </Card>
                                        <Card style={{ margin: "1rem 0rem" }}>
                                             <Typography style={{ fontWeight: "bold", padding: "1rem" }}>Tổ Chức</Typography>
                                             <Divider />
                                             <Typography style={{ margin: '1rem 0rem', padding: "1rem" }}>alo 123</Typography>
                                        </Card>
                                        <Card style={{ margin: "1rem 0rem" }}>
                                             <Typography style={{ fontWeight: "bold", padding: "1rem" }}>Kỹ Năng</Typography>
                                             <Divider />
                                             <Typography style={{ margin: '1rem 0rem', padding: "1rem" }}>{user?.skills}</Typography>
                                        </Card>
                                   </Grid>
                                   <Grid item xs={12} md={9}>
                                        <div className={classes.rightPost}>
                                             {posts &&
                                                  posts.map((item) => {
                                                       return (
                                                            <Post key={item.id} post={item} />
                                                       );
                                                  })}
                                        </div>
                                   </Grid>
                              </Grid>
                         </div>
                    </Grid>
               </Box>
          </>
     );
}

export default Profile;