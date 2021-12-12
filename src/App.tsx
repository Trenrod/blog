import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
// import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Divider, Box } from '@material-ui/core'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Previews from './components/previews';
import BlogPost from './components/blogpost';
import Impress from './pages/impress';
import AboutMe from './pages/aboutme';

const useStyles = makeStyles((theme) => ({
  toolbarTitle: {
    flexGrow: 1,
    textAlign: "center"
  },
  tagList: {
    // textAlign: "center"
  },
  titleLink: {
    color: theme.palette.primary.contrastText,
  },
  topicListItem: {
    display: "inline-block",
    margin: "0.5rem",
  },
  dividerHeader: {
    marginBottom: "1rem"
  },
  dividerFooter: {
    marginTop: "1rem",
  },
  footer: {
    margin: "0.5rem"
  },
  content: {
  }
}));

function App() {
  const classes = useStyles();
  const [tags, setTags] = useState<string[]>([]);
  useEffect(() => {
    const getData = async () => {
      const request = await fetch('/data/tags.json');
      const resJson = await request.json();
      let tags: any;
      if (resJson != null && Array.isArray(resJson)) {
        tags = resJson;
      }
      setTags(tags);
    }
    getData();
  }, []);


  return (
    <Router>
      <div className="App">
        <AppBar position="static" color="transparent">
          <Toolbar >
            <Typography variant="h6" className={classes.toolbarTitle}>
              <Link to={`/aboutme`} className={classes.titleLink}>TRENROD</Link>
              {'`s BLOG'}
            </Typography>
          </Toolbar>
        </AppBar>
        <Container className={classes.tagList}>
          <ul>
            {tags.map((tag: string) => {
              return <li key={tag} className={classes.topicListItem}>
                <Link to={`/blogPreviewFilter/${tag}`} className={classes.titleLink}>
                  {tag.toUpperCase()}
                </Link>
              </li>
            })}
          </ul>
        </Container>
        <Box></Box>
        <Divider className={classes.dividerHeader}></Divider>
        <Routes>
          <Route path="/blogPreviewFilter/:previewFilterName" element={<Previews />} />
          <Route path="/blogPost/:blogPostName" element={<BlogPost />} />
          <Route path="/impress" element={<Impress />} />
          <Route path="/aboutme" element={<AboutMe />} />
          <Route path="/" element={<Previews />} />
        </Routes>
        <Divider className={classes.dividerFooter}></Divider>
        <Container>
          <Box className={classes.footer}>
            <Typography variant="body1">
              <Link to="/impress" className={classes.titleLink}>Impressum</Link>
            </Typography>
          </Box>
        </Container>
      </div >
    </Router>
  );
}

export default App;
