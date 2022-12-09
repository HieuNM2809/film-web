import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { topics } from '../../../data/topic';
import { Box, Button, Card, CardContent, Grid, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import NewsFeed from '../../../commons/NewsFeed/NewsFeed';
import { getDetailTopic, getTopics } from '../../../api/topic';
import Post from '../../../commons/NewsFeed/Post';
import { getPostByTopicId } from '../../../api/post';

DetailTopic.propTypes = {

};
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
function DetailTopic(props) {
    const classes = useStyles();
    const { topicId } = useParams();
    const [posts, setPosts] = useState([]);
    const [topic, setTopic] = useState({});

    useEffect(() => {
        getDetailTopic(topicId)
            .then((res) => {
                setTopic(res.data.data[0]);
            })
            .catch((error) => {
                console.log(error.message);
            });
        getPostByTopicId({ sort: 'DESC', id_title_type: topicId })
            .then((res) => {
                setPosts(res.data.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [topicId]);


    return (
        <>
            <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
                <Toolbar />
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Card className={classes.card} style={{ marginBottom: '1rem', borderTopColor: `${topic?.color}` }}>
                            <CardContent>
                                <Link to="#" className={classes.tagName}>
                                    <Typography sx={{ mb: 1 }} variant="h3">
                                        {topic?.type}
                                    </Typography>
                                </Link>
                                <Typography sx={{ mb: 1 }} variant="body2" className={classes.tagContent}>
                                    {topic?.description}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {topic?.amount_post} Bài Viết
                                </Typography>
                                <Button variant="contained" color="inherit">
                                    Theo dõi
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={0} md={3}>
                        <div><strong>Nội dung cho phép</strong></div>
                        <br />
                        <Typography>Các nội dung thể hiện góc nhìn, quan điểm đa chiều về các vấn đề {topic?.type}.</Typography>
                        <br />
                        <div><strong>Quy định</strong></div>
                        <ul>
                            <li>Những nội dung không thuộc phạm trù của danh mục sẽ bị nhắc nhở và xoá (nếu không thay đổi thích hợp).</li>
                            <li>Nghiêm cấm spam, quảng cáo.</li>
                            <li>
                                Nghiêm cấm post nội dung 18+ hay những quan điểm cực đoan liên quan tới chính trị - tôn giáo.
                            </li>
                            <li>Nghiêm cấm phát ngôn thiếu văn hoá và đả kích cá nhân.</li>
                            <li> Nghiêm cấm bài đăng không ghi rõ nguồn nếu đi cóp nhặt.</li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        {posts &&
                            posts.map((item) => {
                                return (
                                    <Post key={item.id} post={item} />
                                );
                            })}
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default DetailTopic;