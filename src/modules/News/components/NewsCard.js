import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
// import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
// import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import clsx from "clsx";
import { format } from "date-fns";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: "100%"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    marginLeft: "auto"
  },
  expandIcon: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  commentBlock: {
    margin: theme.spacing(2, 0)
  }
}));

export default function NewsCard({ news }) {
  const { comments = {} } = news;

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {news.title[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={news.title}
        subheader={format(new Date(news.createdAt), "MMMM dd, yyyy")}
      />
      {/* <CardMedia
        className={classes.media}
        image="http://lorempixel.com/400/200/"
        title="Random image"
      /> */}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {news.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        {news.voted.length}
        <Button
          className={classes.expand}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          Comments{" "}
          <ExpandMoreIcon
            className={clsx(classes.expandIcon, {
              [classes.expandOpen]: expanded
            })}
          />
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {Object.keys(comments).map(commentId => (
            <Fragment key={commentId + news.comments[commentId].createdAt}>
              <div className={classes.commentBlock}>
                <Typography variant="overline">
                  {format(
                    new Date(news.comments[commentId].createdAt),
                    "MMMM dd, yyyy HH:mm:ss.S"
                  )}
                </Typography>
                <Typography variant="body2">
                  {news.comments[commentId].comment}
                </Typography>
              </div>
              <Divider />
            </Fragment>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
