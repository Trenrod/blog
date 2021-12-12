import React from 'react';
import { Box, Container, IconButton } from '@material-ui/core';

import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
}));

const AboutMe = () => {
    const classes = useStyles();
    return (
        <Container maxWidth="sm">
            <Card className={classes.root}>
                <CardActionArea>
                    <CardContent>
                        <Box style={{ flexDirection: "row", flex: "1", display: "flex" }}>
                            <Avatar style={{ marginRight: "2rem" }} alt="Remy Sharp" src="/images/avatar.png" className={classes.large} />
                            <Box>
                                <Typography gutterBottom variant="h5" component="h2">
                                    TreNrod
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Yeah, thats me.
                                </Typography>
                            </Box>
                            {/* <Image ></Image> */}
                        </Box>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <IconButton aria-label="linkedin" href="https://de.linkedin.com/in/albertdorn" >
                        <LinkedInIcon fontSize="large"></LinkedInIcon>
                    </IconButton>
                    <IconButton aria-label="github" href="https://github.com/Trenrod">
                        <GitHubIcon fontSize="large"></GitHubIcon>
                    </IconButton>
                </CardActions>
            </Card>
        </Container>
    )
}

export default AboutMe;