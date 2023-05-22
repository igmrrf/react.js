import { Link } from "react-router-dom";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import PropTypes from "prop-types";

function ListItemLink(props: any) {
  const { icon, primary, to, type } = props;

  return type === undefined ? (
    <ListItemButton component={Link} to={to}>
      <ListItemText sx={{ px: 2, py: 4 }} primary={primary} />
    </ListItemButton>
  ) : (
    <li>
      <ListItemButton component={Link} to={to}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText sx={{ px: 2, py: 4 }} primary={primary} />
      </ListItemButton>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default ListItemLink;
