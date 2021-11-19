import Link from "next/link";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

export default function MainNav() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/">
            <a>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Todo Manager
              </Typography>
            </a>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
