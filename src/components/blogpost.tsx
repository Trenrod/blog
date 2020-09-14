import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Container, Divider, makeStyles, Typography } from '@material-ui/core';
import CodeBlock from './codeblock';

const useStyles = makeStyles((theme) => ({
    content: {
        minHeight: "100vh"
    },
    titleLink: {
        color: theme.palette.primary.contrastText,
    }
}));

const BlogPost = () => {
    const classes = useStyles();
    const { blogPostName } = useParams<{ blogPostName: string }>();
    const [blogData, setBlogData] = useState<string | undefined>();

    useEffect(() => {
        if (!blogData) {
            const getData = async () => {
                const request = await fetch(`/blogs/${blogPostName}.md`);
                const resText = await request.text();
                setBlogData(resText)
            }
            getData();
        }
    });

    return (
        <Container maxWidth="md" className={classes.content} >
            <ReactMarkdown source={blogData}
                renderers={{ code: CodeBlock }}></ReactMarkdown>
        </Container>
    );
}

export default BlogPost;