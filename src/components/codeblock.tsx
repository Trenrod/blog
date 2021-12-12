import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs as prismstyle } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from "react-markdown";
import yaml from 'js-yaml';
import { ReactP5Wrapper } from "react-p5-wrapper";
import useResizeObserver from "../hooks/useResizeObserver";
import { Box, Divider, Link, makeStyles, Typography } from "@material-ui/core";
import RedditIcon from '@material-ui/icons/Reddit';
import GitHubIcon from '@material-ui/icons/GitHub';
import moment from "moment";

interface Props {
    node: any,
    props: any,
    rawdata: string
}


interface IUseWindowsSize {
    width: number | undefined;
    height: number | undefined;
}

class SketchContainer {
    private preload?: string;
    private setup?: string;
    private draw?: string;
    private size?: IUseWindowsSize;
    private data?: any;

    constructor(sketchData: BlogP5WrapperProps, size: IUseWindowsSize) {
        this.preload = sketchData.preload;
        this.setup = sketchData.setup;
        this.draw = sketchData.draw;
        this.size = size;
        this.data = null;
    }

    public sketch(p: any) {
        // @ts-ignore @typescript-eslint/no-unused-vars
        let data = {
            size: this.size
        };

        p.preload = () => {
            if (this.preload)
                eval(this.preload)
        }

        p.setup = () => {
            // p.createCanvas(600, 400, p.WEBGL);
            if (this.setup)
                eval(this.setup)
        };

        p.draw = () => {
            if (this.draw) {
                eval(this.draw);
            }
        };
    }
};

type BlogP5WrapperProps = {
    preload: string, setup: string, draw: string
}

const BlogP5Wrapper = (sketchData: BlogP5WrapperProps) => {
    const [ref, width] = useResizeObserver();
    const sketchContainer = new SketchContainer(sketchData, {
        height: 0,
        width: width
    });
    return (
        <div ref={ref}>
            <ReactP5Wrapper sketch={sketchContainer.sketch.bind(sketchContainer)} />
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    link: {
        display: "flex",
        alignSelf: "center",
        color: theme.palette.primary.contrastText,
    },
}));

const CodeBlock = (props: Props) => {
    const classes = useStyles();
    // const { language, value } = props;

    const language = props.props.className;
    const value = props.props.children[0];

    if (language === "language-meta") {
        const data = JSON.parse(value);
        const mdData = `# ${data.title}\n${data.description || ""}`;
        return (
            <Box display="flex" flexDirection="column">
                <Box display="flex" justifyContent="space-between" flexDirection="row">
                    <Box display="flex" flexDirection="column" >
                        {data.created
                            ? <Typography variant="caption">Created: {moment().format('L')}</Typography>
                            : null
                        }
                        {data.created
                            ? <Typography variant="caption">Updated: - </Typography>
                            : null
                        }
                    </Box>
                    <Box display="flex" flexDirection="column">
                        {data.githublink
                            ? <Box display="flex" alignContent="center">
                                <Box paddingRight="0.25rem">
                                    <GitHubIcon fontSize="small"></GitHubIcon>
                                </Box>
                                <Link href={data.githublink} className={classes.link}>
                                    <Typography variant="caption">Source</Typography>
                                </Link>
                            </Box>
                            : null
                        }
                        {data.redditlink
                            ? <Box display="flex" alignContent="center">
                                <Box paddingRight="0.25rem">
                                    <RedditIcon fontSize="small"></RedditIcon>
                                </Box>
                                <Link href={data.redditlink} className={classes.link}>
                                    <Typography variant="caption">Comments</Typography>
                                </Link>
                            </Box>
                            : null
                        }
                    </Box>
                </Box>
                <Divider style={{ marginBottom: "1rem" }}></Divider>
                <ReactMarkdown children={mdData} ></ReactMarkdown >
            </Box >
        )
    } else if (language === "language-plantuml") {
        return <div></div>
    } else if (language === "language-sketch") {
        const sketchData = yaml.load(value) as BlogP5WrapperProps;
        return BlogP5Wrapper(sketchData);
    } else {
        return (
            <SyntaxHighlighter language={language} style={prismstyle}>
                {value}
            </SyntaxHighlighter>
        );
    }
}

export default CodeBlock;
