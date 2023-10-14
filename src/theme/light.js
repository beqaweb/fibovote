import React from "react";
import { createTheme } from "@mui/material";
import { Link } from "react-router-dom";

const LinkBehavior = React.forwardRef((props, ref) => {
  const { href, ...other } = props;
  return <Link {...other} ref={ref} to={href} />;
});

export const lightTheme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
        to: "",
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});
