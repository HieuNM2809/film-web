import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPosts } from '../../api/home';
import Post from './Post';
import axiosService from '../../configs/axiosService';
import './NewsFeed.scss'

NewsFeed.propTypes = {

};

function NewsFeed(props) {
    let page = 1
    const [posts, setPosts] = useState([]);
    const getMorePost = () => {
        axiosService.get(`${process.env.REACT_APP_API_ENDPOINT}/get-post-custom-new?posts_on_page=3&page=${page}&sort=DESC`)
            .then((res) => {
                const newPosts = [];
                res.data.data.data.forEach((p) => newPosts.push(p));
                setPosts((oldPost) => [...oldPost, ...newPosts]);
            })
            .catch((error) => {
                console.log(error.message);
            });
        page += 1;
    };

    const handleScroll = (e) => {
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
            getMorePost();
        }
    };

    useEffect(() => {
        getMorePost();
        window.addEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {posts &&
                posts.map((item) => {
                    return (
                        <Post key={item.id} post={item} />
                    );
                })}
            <div class="loading">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </>
    );
}

export default NewsFeed;