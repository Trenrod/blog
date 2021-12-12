import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Container, makeStyles } from '@material-ui/core';
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
    const { blogPostName } = useParams();
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
            {
                blogData
                    ? <ReactMarkdown children={blogData} components={{ code: ({ node, ...props }) => { return <CodeBlock node={node} props={props} rawdata={blogData}></CodeBlock> } }}></ReactMarkdown>
                    : <div></div>
            }
        </Container>
    );
}

export default BlogPost;