import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import "swiper/css";
import "swiper/css/navigation";
import { Box, Button, Card, CardActions, CardContent, Grid, Toolbar, Typography } from '@mui/material';
import { getDetailTopic, getTopics } from '../../api/topic';

Topic.propTypes = {

};
const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.color.base,
        fontSize: '1.5rem !important',
        minHeight: '40px',
        fontWeight: 'bold !important',
        '@media (min-width:640px)': {
            fontSize: '1.875rem !important',
        },
    },
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
    },
}));

function Topic(props) {
    const classes = useStyles();
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        getTopics()
            .then((data) => {
                setTopics(data.data.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []);


    return (
        <>
            <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
                <Toolbar />
                <Typography variant="h3" className={classes.title}>Tất cả chủ đề</Typography>
                <Grid container spacing={2}>
                    {topics && topics.map((item) => {
                        return (
                            <Grid key={item.id} item xs={12} md={6} lg={4}>
                                <Card className={classes.card} style={{ borderTopColor: `${item.color}` }}>
                                    <CardContent>
                                        <Link to={`/topic/${item.id}`} className={classes.tagName}>
                                            <Typography sx={{ mb: 1 }} variant="h3">
                                                {item.type}
                                            </Typography>
                                        </Link>
                                        <Typography sx={{ mb: 1 }} variant="body2" className={classes.tagContent}>
                                            {item.description}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            13 bài viết
                                        </Typography>
                                        <Button variant="contained" color="inherit">
                                            Theo dõi
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </>
    );
}

export default Topic;