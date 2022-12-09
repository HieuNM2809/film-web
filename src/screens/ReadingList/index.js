import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper } from '@mui/material';
import { getPostsSave, unsavePost } from '../../api/post';
import { useSelector } from 'react-redux';
import SingleSavePost from './SingleSavePost/SingleSavePost';

ReadingList.propTypes = {

};

function ReadingList(props) {
    const [postsSave, setPostsSave] = useState([]);

    const data = { id_user: useSelector((state) => state.user?.currentUser?.id) }

    const handleUnsavePost = (idUnsave) => {
        unsavePost(idUnsave)
            .then((res) => {
                console.log('bo luu thanh cong');
            })
            .catch((err) => {
                console.log('bo luu that bai');
            })
        const newPostsSave = postsSave.filter(post => (post.id !== idUnsave.id))

        setPostsSave(newPostsSave);
    }

    useEffect(() => {
        getPostsSave(data)
            .then((res) => {
                setPostsSave(res.data.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);

    return (
        <Grid container>
            <Grid item xs={12} style={{ marginTop: 58 }}>
                <h1>Danh Sách Đã Lưu</h1>
                <Paper elevation={10} style={{ padding: 20, margin: '1rem' }}>
                    {postsSave.length == 0
                        ? <h1 style={{ textAlign: 'center' }}>Danh sách đã lưu trống</h1>
                        : postsSave.map((item, index) => {
                            return (
                                <SingleSavePost key={index} savePost={item} unSavePost={handleUnsavePost} />
                            )
                        })
                    }
                </Paper>
            </Grid>
        </Grid>
    );
}

export default ReadingList;