import { Box, Card, CardContent, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    
}));

function Contact(props) {
    const classes = useStyles();

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Card>
                <CardContent>
                    <h1 style={{ textAlign: 'center' }}>Liên Hệ</h1>
                    <Typography style={{ textAlign: 'center', fontSize: '1.25rem', width: '90%', margin: "0px auto" }}>DEV là một cộng đồng các nhà phát triển phần mềm cùng nhau giúp đỡ lẫn nhau. Ngành công nghiệp phần mềm dựa trên sự hợp tác và học tập trên mạng. Chúng tôi cung cấp một nơi để điều đó xảy ra.</Typography>
                    <h1 style={{ textAlign: 'center' }}>Bug report</h1>
                </CardContent>
            </Card>
        </Box>
    );
}

export default Contact;