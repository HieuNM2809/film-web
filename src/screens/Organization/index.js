import React, { useEffect, useState } from 'react';
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editUser } from '../../api/user';
import { convertString, patternNormal, patternWebsite } from '../../utils';
import { changePass, getDataUser, logOut } from '../../api/auth';
import CommonSelect from '../../commons/CommonSelect';

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
               padding: '8px 16px 8px 8px !important',
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

function Organization() {
     const classes = useStyles();
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const currentUser = useSelector((state) => state.user?.currentUser);
     const token = useSelector((state) => state.auth?.login?.token);
     const [name, setName] = useState('');
     const [website, setWebsite] = useState('');
     const [bio, setBio] = useState('');
     const [avatar, setAvatar] = useState(null);
     const [avtUpload, setAvtUpload] = useState();
     const [validateAvt, setValidateAvt] = useState('');
     const [validateName, setValidateName] = useState('');
     const [validateWebsite, setValidateWebsite] = useState('');

     useEffect(() => {

     }, [])

     const onChangeImg = async (e) => {
          const reader = new FileReader();

          reader.onload = () => {
               if (reader.readyState === 2) {
                    setAvatar(reader.result)
               }
          }
          if (e.target.files[0] > 1024 * 1024) {
               setValidateAvt('Vui lòng không upload ảnh quá 1MB')
          } else {
               setAvtUpload(e.target.files[0])
          }
          reader.readAsDataURL(e.target.files[0]);
     };

     const checkFormValid = () => {
          if (
               validateName !== '' ||
               validateWebsite !== '' ||
               validateAvt !== ''
          ) {
               return false;
          } else {
               return true;
          }
     };

     const handleChangeUserProfile = (e) => {
          e.preventDefault();

          //--------- VALIDATE --------------------//
          if (name.trim() === '') {
               setValidateName('Vui lòng không bỏ trống tên');
          } else setValidateName('');
          if (patternWebsite.exec(website) === null) {
               setValidateWebsite('Địa chỉ url không hợp lệ');
          } else setValidateWebsite('');
          //--------- VALIDATE --------------------//

          const newOrg = {
               name: name,
          };
          if (checkFormValid()) {

          } else {
               alert("Kiem tra lai form")
          }
     }

     return (
          <div style={{ margin: "72px auto", width: '1200px' }}>
               <h1>Tổ Chức Của Bạn</h1>
               <Grid>
                    <Paper elevation={10} style={{ padding: 20, marginBottom: '1rem' }}>
                         <form onSubmit={handleChangeUserProfile}>
                              <div style={{ width: "100%" }}>

                                   <Typography variant='subtitle' className={classes.label}>
                                        {'Tên Tổ Chức'}
                                   </Typography>
                                   <TextField
                                        onClick={() => { }}
                                        className={classes.textBox}
                                        variant='outlined'
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        helperText={''}
                                        error
                                   />
                                   <div style={{ color: 'red' }}>
                                        {validateName}
                                   </div>
                                   <Typography variant='subtitle' className={classes.label}>
                                        {'Ảnh Đại Diện'}
                                   </Typography>
                                   <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar
                                             alt={`avatar ${name}`}
                                             src={avatar}
                                             sx={{
                                                  width: "4rem",
                                                  height: "4rem",
                                             }}
                                        />
                                        <input
                                             style={{ display: 'none', }}
                                             type='file'
                                             accept='image/*'
                                             name='image-upload'
                                             id='input'
                                             onChange={onChangeImg}
                                        />
                                        <label htmlFor="input" className='image-upload'>
                                             Cập Nhật Ảnh Đại Diện
                                        </label>
                                   </div>
                                   <div style={{ color: 'red' }}>
                                        {validateAvt}
                                   </div>
                                   <Typography variant='subtitle' className={classes.label}>
                                        {'Website'}
                                   </Typography>
                                   <TextField
                                        onClick={() => { }}
                                        className={classes.textBox}
                                        variant='outlined'
                                        onChange={(e) => setWebsite(e.target.value)}
                                        value={website}
                                        helperText={''}
                                        error
                                   />
                                   <div style={{ color: 'red' }}>
                                        {validateWebsite}
                                   </div>
                                   <Typography variant='subtitle' className={classes.label}>
                                        {'Tiểu Sử'}
                                   </Typography>
                                   <TextField
                                        onClick={() => { }}
                                        className={classes.textBox}
                                        variant='outlined'
                                        onChange={(e) => setBio(e.target.value)}
                                        value={bio}
                                        helperText={''}
                                        error
                                   />
                              </div>
                              <Button color='primary' variant="contained" type='submit' style={{ margin: '8px 0', padding: '0.75rem 1.25rem', width: '100%' }}>Xác Nhận</Button>
                         </form>
                    </Paper>

                    <Paper elevation={10} style={{ padding: 20, marginBottom: '1rem' }}>

                    </Paper>
               </Grid>
          </div>
     );
}

export default Organization;