import React, { FunctionComponent, useEffect, useState } from 'react';
import BlogData from '../models/blogdata';
import { makeStyles, Grid, Card, CardHeader, Typography, CardContent, CardActions, Button, Container } from '@material-ui/core';
import moment from 'moment';
import { useNavigate, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    toolbarTitle: {
        flexGrow: 1
    },
    titleLink: {
        color: theme.palette.primary.contrastText
    },
    content: {
        // minHeight: "100vh"
    },
    root: {},
    blogPreviewCard: {
        textAlign: "start"
    },
    title: {},
    pos: {},
    bullet: {},
    subheader: {
        display: "inline"
    }
}));

const Previews: FunctionComponent = () => {
    const classes = useStyles();
    const history = useNavigate();
    const { previewFilterName } = useParams();
    const [topBlogs, setTopBlogs] = useState<BlogData[]>([]);
    useEffect(() => {
        const getData = async () => {
            try {
                let request;
                if (previewFilterName) {
                    request = await fetch(`/data/tag_${previewFilterName}.json`);
                } else {
                    request = await fetch('/data/home_data.json');
                }
                const resJson = await request.json();

                let blogData: BlogData[] = [];
                if (resJson != null && Array.isArray(resJson)) {
                    blogData = resJson.map((blogData: any): BlogData => BlogData.fromJsonObject(blogData));
                }
                setTopBlogs(blogData)
            } catch (error) {
                console.log(error);

            }
        }
        getData();
    }, [previewFilterName]);

    const blogItems = topBlogs.map((blogData: BlogData, idx: number) => {
        return <Grid key={`${idx}_${blogData.tag}`} item md={6} xs={12}>
            <Card className={classes.blogPreviewCard}>
                <CardHeader
                    title={blogData.title}
                    subheader={
                        <Typography>{blogData.tag.toUpperCase()} | {moment(blogData.created).format('YYYY-MM-DD')}</Typography>
                    }
                />
                <CardContent>
                    <Typography variant="body2" component="p">
                        {blogData.description}
                    </Typography>
                </CardContent>
                <CardActions >
                    <Button size="small" onClick={() => {
                        history(`/blogPost/${blogData.id}`);
                    }}>read more</Button>
                </CardActions>
            </Card>
        </Grid >
    });

    return (
        <Container maxWidth="md" className={classes.content}>
            <Grid container spacing={1}>{blogItems}</Grid>
        </Container >
    )
}

export default Previews;
