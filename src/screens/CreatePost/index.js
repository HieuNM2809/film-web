import './CreatePost.scss';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { AppBar, Box, Button, TextField, Toolbar, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import devlogo from '../../assets/img/devlogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { getTopics } from '../../api/topic';
import { getOrgByUserId } from '../../api/organization';
import CommonSelect from '../../commons/CommonSelect';
import { createGroupPost, createPost } from '../../api/post';

CreatePost.propTypes = {

};

const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: '#E5E5E5 !important',
        color: '#000 !important',
        boxShadow: 'none !important',
    },
    textBoxTitle: {
        color: ' #3C3C3C',
        width: '100%',
        '& input': {
            padding: 0,
            fontSize: '3rem',
            fontWeight: 800,
        },
        '& fieldset': {
            border: 'none'
        }
    },
    textBox: {
        color: ' #A9A8AA',
        width: '100%',
        '& input': {
            padding: '0px 16px 16px 5px !important',
        },
        '& fieldset': {
            border: 'none'
        }
    },
    select: {
        color: '#181818',
        backgroundColor: '#ffffff',
        marginBottom: '1rem',
        width: '-webkit-fill-available',
        boxShadow: theme.boxShadow,
        '& .MuiSelect-select': {
            padding: '14px 30px 14px 14px !important'
        },
        '& fieldset': {
            border: 'none'
        }
    },
    selectOrg: {
        color: '#181818',
        backgroundColor: '#ffffff',
        width: '-webkit-fill-available',
        boxShadow: theme.boxShadow,
        '& .MuiSelect-select': {
            padding: '8px 7px 8px 7px !important'
        },
        '& fieldset': {
            border: 'none'
        }
    },
    grid: {
        justifyContent: 'flex-start',
        '& .MuiGrid-grid-xs-6': {
            maxWidth: '235px'
        }
    },
    link: {
        textDecoration: 'none',
        color: `${theme.color.base60} !important`,
        '&:hover': {
            backgroundColor: theme.color.base10,
        },
    },
    activeLink: {
        textDecoration: 'none',
        color: `#000000 !important`,
        fontWeight: 'bold !important',
        '&:hover': {
            backgroundColor: theme.color.base10,
        },
    },
}));

function CreatePost(props) {
    const classes = useStyles();
    const navigate = useNavigate();
    const currentUserId = useSelector((state) => state.user?.currentUser?.id);
    const [active, setActive] = useState(true);
    const [content, setContent] = useState('');
    const [topic, setTopic] = useState(1);
    const [topics, setTopics] = useState([]);
    const [organization, setOrganization] = useState('none');
    const [organizations, setOrganizations] = useState([]);
    const [featureImg, setFeatureImg] = useState(null);
    const [featureImgUpload, setFeatureImgUpload] = useState();
    const [title, setTitle] = useState('');
    const [validateFeatureImg, setValidateFeatureImg] = useState('');

    useEffect(() => {
        if (!currentUserId) {
            navigate('/home')
        }
        getTopics()
            .then((res) => {
                setTopics(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            })
        getOrgByUserId(currentUserId)
            .then((res) => {
                setOrganizations(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [currentUserId])

    const ListTopic = topics.map((items) => {
        return { value: items.id, label: items.type };
    })

    const ListOrg = organizations.map((items) => {
        return { value: items?.organization?.id, label: items?.organization?.name };
    })

    ListOrg.unshift({
        value: 'none',
        label: 'Cá nhân',
    });

    const onChangeImg = async (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setFeatureImg(reader.result)
            }
        }
        if (e.target.files[0] > 1024 * 1024) {
            setValidateFeatureImg('Vui lòng không upload ảnh quá 1MB')
        } else {
            setFeatureImgUpload(e.target.files[0])
        }
        reader.readAsDataURL(e.target.files[0]);
    };

    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const body = new FormData();
                    loader.file.then((file) => {
                        body.append("image", file);
                        fetch(`${process.env.REACT_APP_API_ENDPOINT}/upload-image-messy`, {
                            method: "post",
                            body: body,
                        })
                            .then((res => res.json()))
                            .then((res) => {
                                resolve({ default: `${process.env.REACT_APP_ENDPOINT}/Messy/${res.data.image}` })
                            })
                            .catch((err) => {
                                reject(err);
                            })
                    })
                })
            }
        }
    }

    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return uploadAdapter(loader);
        };
    }

    function createMarkup() {
        return { __html: content };
    }

    const checkFormValid = () => {
        if (
            content.trim() === '' ||
            title.trim() === '' ||
            featureImg === null
        ) {
            return true;
        } else {
            return false;
        }
    };

    const handleCreatePost = () => {

        if (organization === 'none') {
            const formData = {
                title: title,
                content: content,
                id_title_type: topic,
                id_user: currentUserId,
                feature_image: featureImgUpload
            };
            createPost(formData)
                .then((res) => {
                    console.log(res);
                    navigate('/home');
                })
                .catch((err) => {
                    alert(err.message);
                })
        } else {
            const formData = {
                title: title,
                content: content,
                id_title_type: topic,
                id_user: currentUserId,
                feature_image: featureImgUpload,
                id_organizations: organization
            };
            createGroupPost(formData)
                .then((res) => {
                    navigate('/home');
                })
                .catch((err) => {
                    alert(err.message);
                })
        }
    }

    return (
        <>
            <AppBar className={classes.header} position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Grid container className={`${classes.grid}`}>
                        <Grid item xs={1}>
                            <Link to='/home'>
                                <img src={devlogo} alt="devlogo" />
                            </Link>
                        </Grid>
                        <Grid item xs={2}>
                            <CommonSelect
                                className={classes.selectOrg}
                                value={organization}
                                onChange={(e) => setOrganization(e.target.value)}
                                // onClick={_onFocusInput}
                                items={ListOrg}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button className={active ? classes.activeLink : classes.link} onClick={() => { setActive(true) }} size="medium" style={{ marginRight: "0.5rem", width: '115px' }}>
                            Chỉnh sửa
                        </Button>
                        <Button className={active ? classes.link : classes.activeLink} onClick={() => { setActive(false) }} size="medium" style={{ marginRight: "0.5rem", width: '115px' }}>
                            Xem trước
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="main" sx={{ flexGrow: 1, p: 2 }} style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '794px', padding: '1rem 0', marginTop: '40px' }}>
                    {
                        active
                            ? <>
                                <div style={{ display: 'flex' }}>
                                    {featureImg ? <img src={featureImg} alt="feature-image" className='input' /> : ''}
                                    <input
                                        style={{ display: 'none', }}
                                        type='file'
                                        accept='image/*'
                                        name='image-upload'
                                        id='input'
                                        onChange={onChangeImg}
                                    />
                                    <label htmlFor="input" className='image-upload'>
                                        Thêm Ảnh Tiêu Đề
                                    </label>
                                </div>
                                <TextField
                                    className={classes.textBoxTitle}
                                    variant='outlined'
                                    placeholder={'Tiêu đề bài viết ở đây'}
                                    onChange={(e) => { setTitle(e.target.value) }}
                                    // onClick={_onFocusInput}
                                    value={title}
                                // helperText={errMajor ? validateMajor() : ''}
                                />
                                <CommonSelect
                                    className={classes.select}
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    // onClick={_onFocusInput}
                                    items={ListTopic}
                                />
                                <CKEditor
                                    config={{
                                        extraPlugins: [uploadPlugin],
                                        mediaEmbed: {
                                            previewsInData: true
                                        }
                                    }}
                                    editor={ClassicEditor}
                                    data={content}
                                    onReady={editor => {
                                        // You can store the "editor" and use when it is needed.
                                        console.log('Editor is ready to use!', editor);
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setContent(data);
                                    }}
                                />
                                <div style={{ marginTop: '1rem' }}>
                                    <Button variant='contained' color="success" onClick={handleCreatePost} size="medium" style={{ marginRight: "0.5rem", width: '115px' }} disabled={checkFormValid()}>
                                        Xuất Bản
                                    </Button>
                                    <Button className={classes.link} onClick={() => { }} size="medium" style={{ marginRight: "0.5rem", width: '115px' }}>
                                        Lưu Nháp
                                    </Button>
                                </div>
                            </>
                            : <>
                                {featureImg ? <img src={featureImg} alt="feature-image" className='featureImg' /> : ''}
                                <h1>{title}</h1>
                                <div dangerouslySetInnerHTML={createMarkup()} />
                            </>
                    }
                </div>
            </Box>
        </>
    );
}

export default CreatePost;