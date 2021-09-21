import React from "react";
import PropTypes from "prop-types";
import { Typography, ListItem, makeStyles } from "@material-ui/core";
import colors from "../constants/colors";

const Block = ({ index, data }) => {
  const classes = useStyles();
  return (
    <ListItem className={classes.root} disableGutters>
      <Typography variant="h6" className={classes.heading}>
        {parseInt(index, 10).toLocaleString("en", { minimumIntegerDigits: 3 })}
      </Typography>
      <Typography className={classes.content}>{data}</Typography>
    </ListItem>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgba(0,0,0,.12)",
    borderRadius: 2,
    marginBottom: 4,
    padding: 8,
    alignItems: "flex-start",
    flexDirection: "column",
    "&:last-child": {
      marginBottom: 0,
    },
  },
  content: {
    fontSize: theme.typography.pxToRem(14),
    color: colors.text,
    lineHeight: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(10),
    fontWeight: "bold",
    color: colors.blue,
    lineHeight: "16px",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
}));

Block.propTypes = {
  index: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};

export default Block;
