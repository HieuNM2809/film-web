import HomeIcon from '../assets/svg/HomeIcon';
import TopicIcon from '../assets/svg/TopicIcon';
import AboutIcon from '../assets/svg/AboutIcon';
import ContactIcon from '../assets/svg/ContactIcon';
import SaveListIcon from '../assets/svg/SaveListIcon';
import Topic from '../screens/Topic';
import About from '../screens/About';
import Contact from '../screens/Contact';
import ReadingList from '../screens/ReadingList/index';
import { convertArrayToObject } from '../utils';
import Home from '../screens/Home';
import Login from '../screens/Login';
import DetailTopic from '../screens/Topic/DetailTopic';
import SinglePost from '../commons/SinglePost';
import CreatePost from '../screens/CreatePost';
import Register from '../screens/Register';
import ErrorPage from '../screens/ErrorPage';
import Profile from '../screens/Profile';
import Setting from '../screens/Setting';
import { HomeWork } from '@mui/icons-material';
import SearchPage from '../screens/SearchPage';
import Organization from '../screens/Organization';

export const linkSidebarLeft = [
    {
        key: 'login',
        path: '/login',
        public: true,
        exact: true,
        component: Login,
    },
    {
        key: 'register',
        path: '/register',
        public: true,
        exact: true,
        component: Register,
    },
    {
        key: 'homeScreen',
        path: '/',
        label: 'Trang chủ',
        public: true,
        exact: true,
        component: Home,
    },
    {
        key: 'home',
        path: '/home',
        label: 'Trang chủ',
        public: true,
        exact: true,
        component: Home,
        icon: HomeIcon,
    },
    {
        key: 'topic',
        path: '/topic',
        label: 'Tất cả chủ đề',
        public: true,
        exact: true,
        component: Topic,
        icon: TopicIcon,
    },
    {
        key: 'detailTopic',
        path: '/topic/:topicId',
        label: 'Chi Tiết chủ đề',
        public: true,
        exact: true,
        component: DetailTopic,
    },
    {
        key: 'about',
        path: '/about',
        label: 'Về chúng tôi',
        public: true,
        exact: true,
        component: About,
        icon: AboutIcon,
    },
    {
        key: 'contact',
        path: '/contact',
        label: 'Liên hệ',
        public: true,
        exact: true,
        component: Contact,
        icon: ContactIcon,
    },
    {
        key: 'readinglist',
        path: '/reading-list',
        label: 'Danh sách đã lưu',
        public: true,
        exact: true,
        component: ReadingList,
        icon: SaveListIcon,
    },
    {
        key: 'post',
        path: '/:userName/:postId',
        label: 'Bài viết',
        public: true,
        exact: true,
        component: SinglePost,
    },
    {
        key: 'user',
        path: '/profile/:userId',
        label: 'Trang Cá Nhân',
        public: true,
        exact: true,
        component: Profile,
    },
    {
        key: 'setting',
        path: '/setting',
        label: 'Cài đặt',
        public: false,
        exact: true,
        component: Setting,
    },
    {
        key: 'createPost',
        path: '/new',
        label: 'Thêm bài viết',
        public: true,
        exact: true,
        component: CreatePost,
    },
    {
        key: 'search',
        path: '/search',
        label: 'tìm kiếm bài viết',
        public: true,
        exact: true,
        component: SearchPage,
    },
    {
        key: 'organization',
        path: '/organization',
        label: 'tổ chức',
        public: false,
        exact: true,
        component: Organization,
    },
    {
        key: 'errorPage',
        path: '*',
        label: 'Trang 404',
        public: true,
        exact: true,
        component: ErrorPage,
    }

];

export const listRouteByKey = convertArrayToObject(linkSidebarLeft, 'key');

export default linkSidebarLeft;

