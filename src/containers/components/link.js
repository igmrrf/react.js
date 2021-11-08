import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  link: {
    padding: "20px 5px",
  },
  icon: {
    color: "blue",
    background: "blue",
  },
}));
function ListItemLink(props) {
  const classes = useStyles();
  const { icon, primary, to } = props;

  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <Link ref={ref} to={to} {...linkProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={CustomLink}>
        <ListItemIcon className={classes.link}>{icon}</ListItemIcon>
        <ListItemText className={classes.link} primary={primary} />
      </ListItem>
    </li>
  );
}
ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default ListItemLink;
