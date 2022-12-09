import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useSearchParams } from 'react-router-dom';
import { search } from '../../api/home';
import Post from '../../commons/NewsFeed/Post';
import TabPanel from '../../commons/TabPanel/TabPanel';
import { Avatar, Box, Button, Card, CardContent, Grid, Tab, Tabs, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

SearchPage.propTypes = {

};

function a11yProps(index) {
     return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
     };
}

const useStyles = makeStyles((theme) => ({
     tagName: {
          color: 'rgb(64,64,64)',
          textDecoration: 'none',
          '& .MuiTypography-h3': {
               fontSize: '1.17rem !important',
               fontWeight: 'bold !important',
          }
     },
     tagContent: {
          textOverflow: 'ellipsis',
          '-webkit-line-clamp': 3,
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
     },
     card: {
          borderTop: '1rem solid',
          width: '100%',
     },
     tab: {
          marginBottom: '16px',
     }
}));

function SearchPage(props) {
     const classes = useStyles();
     const [searchParams, setSearchParams] = useSearchParams();
     const [posts, setPosts] = useState([]);
     let users = []
     let titleTypes = []
     const searchName = searchParams.get('key') || '';

     const [value, setValue] = useState(0);

     const handleChange = (event, newValue) => {
          setValue(newValue);
     };

     posts.forEach(item => {
          users.push(item.user)
          titleTypes.push(item.title_type)
     });

     useEffect(() => {
          search(searchName)
               .then((res) => {
                    setPosts(res.data.data);
               })
               .catch((err) => {
                    console.log(err);
               })
     }, [searchName])

     return (
          <div style={{ margin: '72px auto', width: '1200px' }}>
               <h1 style={{ textAlign: 'center' }}>Kết quả tìm kiếm cho: {searchName}</h1>
               <Box sx={{ width: '100%' }}>
                    <Box>
                         <Tabs className={classes.tab} value={value} onChange={handleChange} aria-label="basic tabs example">
                              <Tab label="Bài viết" {...a11yProps(0)} />
                              <Tab label="Người dùng" {...a11yProps(1)} />
                              <Tab label="Chủ đề" {...a11yProps(2)} />
                         </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                         {posts &&
                              posts.map((item) => {
                                   return (
                                        <Post key={item.id} post={item} />
                                   );
                              })}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                         {users &&
                              users.map((user) => {
                                   return (
                                        <Grid container spacing={2}>
                                             <Grid item xs={12} md={12} lg={12}>
                                                  <Card style={{ width: '100%', marginBottom: '1rem', borderTopColor: `${user?.color}` }}>
                                                       <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <div style={{ display: 'flex' }}>
                                                                 <Avatar
                                                                      alt={`avatar ${user?.name}`}
                                                                      src={`${process.env.REACT_APP_ENDPOINT}/user/${user?.avatar}`}
                                                                      sx={{ width: 48, height: 48 }}
                                                                      style={{ marginRight: '0.5rem' }}
                                                                 />
                                                                 <div>
                                                                      <Link to="#" className={classes.tagName}>
                                                                           <Typography sx={{ mb: 1 }} variant="h3">
                                                                                {user?.name}
                                                                           </Typography>
                                                                      </Link>
                                                                      <Typography sx={{ mb: 1 }} variant="body2" className={classes.tagContent}>
                                                                           {user?.bio}
                                                                      </Typography>
                                                                 </div>
                                                            </div>
                                                            <div>
                                                                 <Button variant="contained" color="inherit">
                                                                      Theo dõi
                                                                 </Button>
                                                            </div>
                                                       </CardContent>
                                                  </Card>
                                             </Grid>
                                        </Grid>
                                   );
                              })
                         }
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                         {titleTypes &&
                              titleTypes.map((topic) => {
                                   return (
                                        <Grid container spacing={2}>
                                             <Grid item xs={12} md={12} lg={12}>
                                                  <Card className={classes.card} style={{ marginBottom: '1rem', borderTopColor: `${topic?.color}` }}>
                                                       <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <div>
                                                                 <Link to="#" className={classes.tagName}>
                                                                      <Typography sx={{ mb: 1 }} variant="h3">
                                                                           {topic?.type}
                                                                      </Typography>
                                                                 </Link>
                                                                 <Typography sx={{ mb: 1 }} variant="body2" className={classes.tagContent}>
                                                                      {topic?.description}
                                                                 </Typography>
                                                            </div>
                                                            <div>
                                                                 <Button variant="contained" color="inherit">
                                                                      Theo dõi
                                                                 </Button>
                                                            </div>
                                                       </CardContent>
                                                  </Card>
                                             </Grid>
                                        </Grid>
                                   );
                              })
                         }
                    </TabPanel>
               </Box>

          </div>
     );
}

export default SearchPage;