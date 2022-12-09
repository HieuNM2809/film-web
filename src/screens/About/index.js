import { Box, Card, CardContent, Grid, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import { faReact, faLaravel, faJsSquare } from '@fortawesome/free-brands-svg-icons';
import ducbang from '../../../src/assets/img/153156931_447157583096627_5512326598805374028_n.jpg';
import hieu from '../../../src/assets/img/hieu.jpg';
import hoangan from '../../../src/assets/img/HoangAn.jpg';
import Duy from '../../../src/assets/img/Duy.jpg';

const useStyles = makeStyles((theme) => ({
    icon: {
        '& svg': {
            transition: 'all .2s ease-in-out',
            "&:hover ": {
                transform: 'scale(1.1)',
            }
        }
    }
}));

function About(props) {
    const classes = useStyles();

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Card>
                <CardContent>
                    <h1 style={{ textAlign: 'center' }}>Về Chúng Tôi</h1>
                    <Typography style={{ textAlign: 'center', fontSize: '1.25rem', width: '90%', margin: "0px auto" }}>DEV là một cộng đồng các nhà phát triển phần mềm cùng nhau giúp đỡ lẫn nhau. Ngành công nghiệp phần mềm dựa trên sự hợp tác và học tập trên mạng. Chúng tôi cung cấp một nơi để điều đó xảy ra.</Typography>
                    <h1 style={{ textAlign: 'center' }}>Các Công Nghệ Sử Dụng </h1>
                    <Grid container style={{ marginTop: '1rem' }}>
                        <Grid item md={3} xs={6}>
                            <div style={{ textAlign: 'center', marginBottom: '1rem' }} className={classes.icon}>
                                <FontAwesomeIcon icon={faReact} className="fa-7x" />
                            </div>
                        </Grid>
                        <Grid item md={3} xs={6}>
                            <div style={{ textAlign: 'center', marginBottom: '1rem' }} className={classes.icon}>
                                <FontAwesomeIcon icon={faLaravel} className="fa-7x" />
                            </div>
                        </Grid>
                        <Grid item md={3} xs={6}>
                            <div style={{ textAlign: 'center', marginBottom: '1rem' }} className={classes.icon}>
                                <FontAwesomeIcon icon={faJsSquare} className="fa-7x" />
                            </div>
                        </Grid>
                        <Grid item md={3} xs={6}>
                            <div style={{ textAlign: 'center', marginBottom: '1rem' }} className={classes.icon}>
                                <FontAwesomeIcon icon={faDatabase} className="fa-7x" />
                            </div>
                        </Grid>
                    </Grid>
                    <h1 style={{ textAlign: 'center' }}>Thành Viên Trong Team</h1>
                    <Grid container style={{ marginTop: '1rem' }}>
                        <Grid item md={6} xs={12}>
                            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                                <img src={ducbang} alt="devteam" style={{ width: "350px", height: "350px", borderRadius: "3px" }} />
                                <div>
                                    <Typography variant='subtitle'>Team: <strong>Front-End</strong></Typography>
                                    <Typography>Nguyễn Đức Bằng</Typography>
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                                <img src={hieu} alt="devteam" style={{ width: "350px", height: "350px", borderRadius: "3px" }} />
                                <div>
                                    <Typography variant='subtitle'>Team: <strong>Back-End</strong></Typography>
                                    <Typography>Nguyễn Minh Hiếu</Typography>
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                                <img src={hoangan} alt="devteam" style={{ width: "350px", height: "350px", borderRadius: "3px" }} />
                                <div>
                                    <Typography variant='subtitle'>Team: <strong>Back-End</strong></Typography>
                                    <Typography>Phạm Hoàng An</Typography>
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                                <img src={Duy} alt="devteam" style={{ width: "350px", height: "350px", borderRadius: "3px" }} />
                                <div>
                                    <Typography variant='subtitle'>Team: <strong>Mobile</strong></Typography>
                                    <Typography>Ngô Đặng Anh Duy</Typography>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}

export default About;