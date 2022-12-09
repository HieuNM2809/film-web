import React, { useEffect, useState } from 'react';
import { Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useDispatch, useSelector } from 'react-redux';
import { getDataUser, loginUser } from '../../api/auth';

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
    customLabel: {
        boxShadow: 'none !important',
        border: 'none !important',
    }
}));

function Login() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`,
                scope: 'email',
            });
        }
        gapi.load('client:auth2', start);
    }, []);

    // const accessToken = gapi.auth.getToken().access_token;
    // console.log(accessToken);

    const onSuccess = (res) => {
        console.log(res.profileObj)
    }

    const onFailure = (res) => {
        console.log(res)
    }

    const onLogout = () => {
        console.log('logout success!')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = { email: email, password: password };
        loginUser(newUser, dispatch, navigate);
    }

    return (
        <div style={{ margin: "72px auto" }}>
            <Grid>
                <Paper elevation={10} style={{ padding: 20 }}>
                    <form onSubmit={handleSubmit}>
                        <Grid align='center'>
                            <h2>Đăng Nhập</h2>
                        </Grid>
                        <div style={{ width: "100%" }}>
                            <Typography variant='subtitle' className={classes.label}>
                                {'Email'}
                            </Typography>
                            <TextField
                                onClick={() => { }}
                                type='email'
                                className={classes.textBox}
                                variant='outlined'
                                placeholder={`${'Nhập Email'}`}
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                helperText={''}
                                error
                            />
                            <Typography variant='subtitle' className={classes.label}>
                                {'Mật Khẩu'}
                            </Typography>
                            <TextField
                                onClick={() => { }}
                                type='password'
                                className={classes.textBox}
                                variant='outlined'
                                placeholder={`${'Nhập Mật Khẩu'}`}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                helperText={''}
                                error
                            />
                        </div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Ghi nhớ"
                            className={classes.customLabel}
                        />
                        <Button color='primary' variant="contained" type='submit' style={{ margin: '8px 0', padding: '0.75rem 1.25rem', width: '100%' }}>Tiếp Tục</Button>
                    </form>
                    <Link to="/forgot">
                        <Typography variant='subtitle2'>
                            Quên mật khẩu ?
                        </Typography>
                    </Link>
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

export default Login;