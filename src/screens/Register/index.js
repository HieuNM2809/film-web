import React, { useEffect, useState } from 'react';
import { Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { loginUser, registerUser } from '../../api/auth';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    label: {
        color: theme.color.text,
        fontWeight: 600,
        lineHeight: '22px',
    },
    textBox: {
        color: ' #A9A8AA',
        width: '100%',
        '& input': {
            margin: '8px 0',
            border: '1px solid #A9A8AA',
            padding: '14px 30px 14px 14px !important',
            borderRadius: '6px',
            '&:focus': {
                borderColor: 'rgb(59, 73, 223)',
                boxShadow: '0 0 0 1px rgb(59, 73, 223)'
            }
        },
        '& fieldset': {
            border: 'none'
        }
    },
}));

function Register() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const token = useSelector((state) => state.auth?.login?.token);

    if (token) {
        navigate('/home');
    }

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: '343150291444-mla19nbg1j7876ovpn237qhn1u6pl4n4.apps.googleusercontent.com',
                scope: 'email',
            });
        }

        gapi.load('client:auth2', start);
    }, []);


    const onSuccess = (res) => {
        console.log(res.profileObj)
    }

    const onFailure = (res) => {
        console.log(res)
    }

    const onLogout = () => {
        console.log('logout success!')
    }

    const handleRegister = (e) => {
        e.preventDefault();
        const newUser = { email: email, password: password, name: username };
        registerUser(newUser, dispatch, navigate);
    }

    return (
        <div style={{ margin: "72px auto", width: '610px' }}>
            <Grid>
                <Paper elevation={10} style={{ padding: 20 }}>
                    <form onSubmit={handleRegister}>
                        <Grid align='center'>
                            <h2>Đăng Ký</h2>
                        </Grid>
                        <div style={{ width: "100%" }}>
                            <Typography variant='subtitle' className={classes.label}>
                                {'Email'}
                            </Typography>
                            <TextField
                                onClick={() => { }}
                                className={classes.textBox}
                                variant='outlined'
                                placeholder={`${'Nhập Email'}`}
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                helperText={''}
                                error
                            />
                            <Typography variant='subtitle' className={classes.label}>
                                {'Tên Người Dùng'}
                            </Typography>
                            <TextField
                                onClick={() => { }}
                                className={classes.textBox}
                                variant='outlined'
                                placeholder={`${'Nhập Tên Người Dùng'}`}
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                helperText={''}
                                error
                            />
                            <Typography variant='subtitle' className={classes.label}>
                                {'Mật Khẩu'}
                            </Typography>
                            <TextField
                                type='password'
                                onClick={() => { }}
                                className={classes.textBox}
                                variant='outlined'
                                placeholder={`${'Nhập Mật Khẩu'}`}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                helperText={''}
                                error
                            />
                        </div>
                        <Button color='primary' variant="contained" type='submit' style={{ margin: '8px 0', padding: '0.75rem 1.25rem', width: '100%' }}>Tiếp Tục</Button>
                    </form>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            buttonText="Đăng Nhập Bằng Google"
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={"single_host_origin"}
                            isSignedIn={true}
                        />
                    </div>
                </Paper>
            </Grid>
        </div>
    );
}

export default Register;